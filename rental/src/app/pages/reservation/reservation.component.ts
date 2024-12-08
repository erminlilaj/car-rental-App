import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateReservationRequest, VehicleEntity } from '../../services/models';
import { VehicleControllerService, ReservationControllerService } from '../../services/services';
import { CommonModule } from '@angular/common'; 
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reservation',
  imports: [CommonModule,
     CalendarModule,
      FormsModule,
       ButtonModule,
      MessageModule,
    ToastModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  standalone: true,
  providers: [MessageService]
})
export class ReservationComponent implements OnInit {
  rangeDates: Date[]=[];
  private route = inject(ActivatedRoute);
  vehicle?: VehicleEntity;
  isAvailable?: boolean;
minDate: Date = new Date();
// maxDate: Date = new Date();
  constructor(
    private vehicleService: VehicleControllerService,
    private reservationService: ReservationControllerService,
    private messageService: MessageService 
  ) {}


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("id is :", id);
    this.getVehicleById(id);
    
  }

  private getVehicleById(id: number): void {
    this.vehicleService.getVehicleById({ id }).subscribe(
      (response) => {
        this.vehicle = response;
        console.log(response);
      }
    );
  }

  checkAvailability():void {
    
  
    // Validate date selection
    if(!this.rangeDates || this.rangeDates.length !== 2) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid dates',
        detail: 'Please select a date range'
      });
      return;
    }
  
    const [startDate, endDate] = this.rangeDates;
  
    // Detailed date logging
    console.log('Start Date (Original):', startDate);
    console.log('End Date (Original):', endDate);
    console.log('Start Date (Formatted):', this.formatDateForBackend(startDate));
    console.log('End Date (Formatted):', this.formatDateForBackend(endDate));
  
    // Date validation
    if (startDate >= endDate) {
      this.messageService.add({
        severity: 'warn', 
        summary: 'Invalid Date Range', 
        detail: 'Start date must be before end date'
      });
      return;
    }
  
    // Vehicle validation
    if(!this.vehicle){
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Vehicle not selected'
      });
      return;
    }
  
    // Prepare availability request
    const availabilityRequest: CreateReservationRequest = {
      vehicleId: this.vehicle.id,
      startDate: this.formatDateForBackend(startDate),
      endDate: this.formatDateForBackend(endDate) 
    };
  
    const params = {
      body: availabilityRequest
    };
  
    
  
    

  this.reservationService.checkReservationAvailability({ body: availabilityRequest })
  .subscribe({
    next: (isAvailable) => {
      
      this.isAvailable = isAvailable;

      if (isAvailable) {
        this.messageService.add({
          severity: 'success', 
          summary: 'Available', 
          detail: 'Vehicle is available for the selected dates'
        });
      } else {
        this.messageService.add({
          severity: 'error', 
          summary: 'Not Available', 
          detail: 'Vehicle is not available for the selected dates'
        });
      }
    },
    error: (error) => {
      console.error('Availability Check Error:', error);
      this.messageService.add({
        severity: 'error', 
        summary: 'Check Failed', 
        detail: error.error?.message || 'Failed to check availability'
      });
    }
  });
  }
reserveVehicle():void{
  if(!this.rangeDates || this.rangeDates.length!==2){
    this.messageService.add({
      severity: 'warn',
      summary: "Invalid dates",
      detail: 'Please select a date range'
    });
    return;
  }
  if(!this.isAvailable){
    this.messageService.add({
      severity: 'error',
      summary: 'Reservation error',
      detail: 'Check availibility before reserving'
    });
    return;
  }
    const [startDate,endDate]=this.rangeDates;

    const reservationRequest: CreateReservationRequest={
      vehicleId: this.vehicle?.id,
      startDate: this.formatDateForBackend(startDate),
      endDate: this.formatDateForBackend(endDate)
    };
console.log("Reservation request: ", JSON.stringify(reservationRequest));
this.reservationService.createReservation({ body: reservationRequest })
    .subscribe({
      next: (response) => {
        console.log('Reservation Response:', response);
        
        
        this.messageService.add({
          severity: 'success', 
          summary: 'Reservation Successful', 
          detail: `Vehicle reserved from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`
        });

        
        this.rangeDates = []; // Clear date selection
        this.isAvailable = undefined; // Reset availability
      },
      error: (error) => {
        console.error('Reservation Error:', error);
        
     
        this.messageService.add({
          severity: 'error', 
          summary: 'Reservation Failed', 
          detail: error.error?.message || 'Failed to make reservation. Please try again.'
        });
      }
    });
}
  private formatDateForBackend(date: Date): string {
    /// Use toISOString() to match the exact format
    return date.toISOString();
  }

}
