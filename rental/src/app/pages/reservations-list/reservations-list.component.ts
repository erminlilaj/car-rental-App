import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationControllerService } from '../../services/services';
import { ReservationResponse } from '../../services/models';
import { AuthenticationControllerService } from '../../services/services';

@Component({
  selector: 'app-reservations-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservations-list.component.html',
  styleUrl: './reservations-list.component.scss'
})
export class ReservationsListComponent implements OnInit {
 
  reservations: ReservationResponse[] = [];
  isLoading = true; 
  error: string | null = null;
  cancelError: string | null=null;

  constructor(
    private reservationService: ReservationControllerService, 
 
  ) {}

  ngOnInit(): void {
   
        
        this.getReservations(); 
   
  }

  getReservations(): void {
   
  
    this.isLoading = true;
   
    this.reservationService.getReservationListOfUser().subscribe({
      next: (reservationList) => {
        this.reservations = reservationList;
        
        this.isLoading = false;
        this.error = null;
      },
      error: (err) => {
        console.error('Failed to fetch reservations:', err);
        this.isLoading = false;
        this.error = 'Failed to load reservations';
        this.reservations = [];
      }
    });
  }

  isCancellable(reservation: ReservationResponse): boolean{
    if (reservation.status !== 'RESERVED' || !reservation.startDate) {
      return false;
    }
    const currentDate = new Date();
    const reservationStartDate = new Date(reservation.startDate);

    // Reservation is cancellablee if start date is in the future
    return reservationStartDate > currentDate;
  }
  cancelReservation(reservationId?: number): void {
    // check if reservationId is defined
    if (reservationId === undefined) {
      this.cancelError = 'Invalid reservation ID';
      return;
    }
    this.cancelError=null;
    this.reservationService.cancelReservation({id:reservationId}).subscribe({
      next: ()=>{
        this.getReservations();
      },
      error:(err)=>{
        this.cancelError='Failed to cancel reservation';
      }
    });
  }
  
  
}