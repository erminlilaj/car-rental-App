package it.linksmt.rental.repository;

import it.linksmt.rental.entity.ReservationEntity;
import it.linksmt.rental.repository.projections.ReservationStatisticsProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<ReservationEntity,Long> {
    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM ReservationEntity r " +
            "WHERE r.vehicle.id = :vehicleId " +
            "AND r.status = 'RESERVED' " +
            "AND ((r.startDate BETWEEN :startDate AND :endDate) " +
            "OR (r.endDate BETWEEN :startDate AND :endDate) " +
            "OR (:startDate BETWEEN r.startDate AND r.endDate))")
    boolean areDatesOverlapping(Long vehicleId, LocalDateTime startDate, LocalDateTime endDate);

    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM ReservationEntity r " +
            "WHERE r.id = :id " +
            "AND r.status != 'CANCELLED' " +
            "AND ( (:currentTime BETWEEN r.startDate AND r.endDate) " +
            "OR (:currentTime > r.endDate) )")
    boolean isReservationOngoingOrCompleted(Long id, LocalDateTime currentTime);

    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM ReservationEntity r " +
            "WHERE r.startDate >= :startOfMonth AND r.endDate <= :endOfMonth")
    boolean areReservationsForMonth(LocalDateTime startOfMonth, LocalDateTime endOfMonth);

    @Query("SELECT COUNT(r) AS count, SUM(r.totalPrice) AS totalPrice FROM ReservationEntity r " +
            "WHERE r.startDate >= :startOfMonth AND r.endDate <= :endOfMonth AND r.status = 'RESERVED' " +
            "AND r.endDate <= :currentTime")
    ReservationStatisticsProjection completedReservationsWithStats(LocalDateTime startOfMonth, LocalDateTime endOfMonth, LocalDateTime currentTime);

    @Query("SELECT COUNT(r) AS count, SUM(r.totalPrice) AS totalPrice FROM ReservationEntity r " +
            "WHERE r.startDate >= :startOfMonth AND r.endDate <= :endOfMonth AND r.status = 'RESERVED' " +
            "AND r.startDate <= :currentTime AND r.endDate >= :currentTime")
    ReservationStatisticsProjection ongoingReservationsWithStats(LocalDateTime startOfMonth, LocalDateTime endOfMonth, LocalDateTime currentTime);

    @Query("SELECT COUNT(r) AS count, SUM(r.totalPrice) AS totalPrice FROM ReservationEntity r " +
            "WHERE r.startDate >= :startOfMonth AND r.endDate <= :endOfMonth " +
            "AND r.status = 'CANCELLED'")
    ReservationStatisticsProjection cancelledReservationsWithStats(LocalDateTime startOfMonth, LocalDateTime endOfMonth);

    @Query("SELECT r FROM ReservationEntity r WHERE r.user.id = :userId")
    List<ReservationEntity> findUsersReservations(Long userId);

    @Query("SELECT r FROM ReservationEntity r " +
            "WHERE r.vehicle.id = :vehicleId " +
            "AND r.status = 'RESERVED' " +
            "AND (r.startDate <= :currentTime AND r.endDate >= :currentTime " +
            "OR r.startDate > :currentTime)")
    List<ReservationEntity> listOfActiveOrFutureReservations(Long vehicleId, LocalDateTime currentTime);

    @Query("SELECT r FROM ReservationEntity r "+
    "WHERE r.status='RESERVED'"+
    "AND r.endDate <= :currentTime")
    List<ReservationEntity> completedReservations(LocalDateTime currentTime);

@Query("SELECT r FROM ReservationEntity r "+
"WHERE r.status='RESERVED' "+
"AND r.startDate <= :currentTime AND r.endDate >= :currentTime")
    List<ReservationEntity> ongoingReservations(LocalDateTime currentTime);

@Query("SELECT r FROM ReservationEntity r "+
"WHERE r.status='CANCELLED'")
List<ReservationEntity> cancelledReservations();

@Query("SELECT r FROM ReservationEntity r "+
"WHERE r.status='RESERVED'"+
"AND r.startDate> :currentTime ")
List<ReservationEntity> futureReservations(LocalDateTime currentTime);

    @Query("SELECT v.id FROM VehicleEntity v " +
            "WHERE v.id IN :vehicleIds " +
            "AND v.id NOT IN (" +
            "    SELECT DISTINCT r.vehicle.id FROM ReservationEntity r " +
            "    WHERE r.status = 'RESERVED' " +
            "    AND (" +
            "        (r.startDate BETWEEN :startDate AND :endDate) " +
            "        OR (r.endDate BETWEEN :startDate AND :endDate) " +
            "        OR (:startDate BETWEEN r.startDate AND r.endDate)" +
            "    )" +
            ")")
    List<Long> findAvailableVehicleByRange(List<Long> vehicleIds, LocalDateTime startDate, LocalDateTime endDate);
}
