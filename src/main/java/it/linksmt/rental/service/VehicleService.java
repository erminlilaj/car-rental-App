package it.linksmt.rental.service;

import it.linksmt.rental.dto.CreateVehicleRequest;
import it.linksmt.rental.dto.UpdateVehicleRequest;
import it.linksmt.rental.entity.VehicleEntity;

import java.util.List;
import java.util.Optional;

public interface VehicleService {
    VehicleEntity createVehicle(CreateVehicleRequest createVehicleRequest);

    List<VehicleEntity> findAllVehicle();

    VehicleEntity findVehicleById(Long id);

    boolean deleteVehicle(Long id);

    VehicleEntity updateVehicle(Long id, UpdateVehicleRequest updateVehicleRequest);
}
