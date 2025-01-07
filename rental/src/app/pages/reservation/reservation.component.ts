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
import { MessageService, ConfirmationService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { GetVehicleImage$Params } from '../../services/fn/vehicle-controller/get-vehicle-image';

@Component({
  selector: 'app-reservation',
  imports: [CommonModule,
     CalendarModule,
      FormsModule,
       ButtonModule,
      MessageModule,
    ToastModule,
  ConfirmDialogModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  standalone: true,
  providers: [MessageService,ConfirmationService]
})
export class ReservationComponent implements OnInit {
  rangeDates: Date[]=[];
  private route = inject(ActivatedRoute);
  vehicle?: VehicleEntity;
  isAvailable?: boolean;
  imageUrl: string = ''; 
minDate: Date = new Date();
userId:number;
// maxDate: Date = new Date();
  constructor(
    private vehicleService: VehicleControllerService,
    private reservationService: ReservationControllerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.userId=Number(localStorage.getItem('userId')||0);
  }


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log("id is :", id);
    console.log("user id is:",this.userId);
    this.getVehicleById(id);
    
  }
 
  private getVehicleById(id: number): void {
    this.vehicleService.getVehicleById({ id }).subscribe(
      (response) => {
        this.vehicle = response;
        console.log(response);
        if(this.vehicle?.imagePath){
          this.fetchVehicleImage(this.vehicle.imagePath);
      }
   
      }
    );
  }
  private fetchVehicleImage(imagePath: string): void {
    const params: GetVehicleImage$Params = { imagePath };
    this.vehicleService.getVehicleImage(params).subscribe({
      next: (imageBlob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result as string; // Assign the image data URL
        };
        reader.readAsDataURL(imageBlob); // Convert Blob to data URL
      },
      error: () => {
        console.error('Failed to fetch vehicle image.');

      },
    });
  }

  checkAvailability():void {
    if(!this.rangeDates || this.rangeDates.length !== 2) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid dates',
        detail: 'Please select a date range'
      });
      return;
    }
  
    const [startDate, endDate] = this.rangeDates;
  
    // Date validation
    if (startDate >= endDate) {
      this.messageService.add({
        severity: 'warn', 
        summary: 'Invalid Date Range', 
        detail: 'Start date must be before end date'
      });
      return;
    }
  
    
    if(!this.vehicle){
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Vehicle not selected'
      });
      return;
    }
  
    //create avaibility req for bE
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
//show confirm dialog before sending the request 
this.confirmationService.confirm({
  message: `Are you sure you want to reserve this vehicle from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}?`,
  header: 'Confirm Reservation',
  icon: 'pi pi-exclamation-triangle',

  accept: () => {
    
    const reservationRequest: CreateReservationRequest = {
      vehicleId: this.vehicle?.id,
      startDate: this.formatDateForBackend(startDate),
      endDate: this.formatDateForBackend(endDate)
    };

    this.reservationService.createReservation({ body: reservationRequest })
      .subscribe({
        next: (response) => {
          console.log('Reservation Response:', response);
          
          this.messageService.add({
            severity: 'success', 
            summary: 'Reservation Successful', 
            detail: `Vehicle reserved from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`
          });

          
          this.rangeDates = []; //reset dates
          this.isAvailable = undefined; 
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
  },
  reject: () => {
    // User canceled the reservation
    this.messageService.add({
      severity: 'info',
      summary: 'Canceled',
      detail: 'Reservation canceled'
    });
  }
});
}
  private formatDateForBackend(date: Date): string {
    /// Use toISOString() to match the exact format
    return date.toISOString();
  }

}
