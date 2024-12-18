import { Component, Input, OnInit } from '@angular/core';
import { VehicleEntity } from '../../services/models/vehicle-entity';
import { VehicleControllerService,ReservationControllerService} from '../../services/services';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GetVehicleImage$Params } from '../../services/fn/vehicle-controller/get-vehicle-image';

import {TableModule} from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule, DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { ReservationListComponent } from '../reservation-list/reservation-list.component';
@Component({
  selector: 'app-vehicle-card',
  imports: [CommonModule,
    ToastModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    TableModule,
    ButtonModule
  ],
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss'],
  standalone: true,
  providers:[DialogService,ConfirmationService,MessageService]
})
export class VehicleCardComponent implements OnInit {
  private _vehicle: VehicleEntity = {};
  imageUrl: string = ''; // Store the fetched image URL
  @Input() isAdmin: boolean = false;

  constructor(
    private router: Router,
    private vehicleService: VehicleControllerService,
    private reservationService: ReservationControllerService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  @Input()
  set vehicle(value: VehicleEntity) {
    this._vehicle = value;
    if (value.imagePath) {
      this.fetchVehicleImage(value.imagePath);
    }
  }

  get vehicle(): VehicleEntity {
    return this._vehicle;
  }

  ngOnInit(): void {}

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
  

  onReservation(vehicleId: number | undefined) {
    console.log('button clicked', vehicleId);
    this.router.navigate([`reservation/${vehicleId}`]);
  }


 onDelete(vehicleId: number | undefined) {
  if (vehicleId === undefined) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Vehicle ID is undefined',
    });
    return;
  }

  this.reservationService.listOfActiveOrFutureReservations({ id: vehicleId }).subscribe({
    next: (reservations) => {
      const dialogRef = this.dialogService.open(ReservationListComponent, {
        header: 'Active or future reservations of this vehicle',
        width: '70%',
        data: {
          reservations,
          vehicleId,
        },
      });

      
      dialogRef.onClose.subscribe((deleteConfirmed: boolean) => {
       
        if (deleteConfirmed) {
        
          this.confirmVehicleDeletion(vehicleId);
        }
      });
    },
    error: () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to check reservations',
      });
    },
  });
}


private confirmVehicleDeletion(vehicleId: number): void {
  console.log("calling this");
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete this vehicle?',
    header: 'Confirm Deletion',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.vehicleService.deleteVehicle({ id: vehicleId }).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Vehicle Deleted Successfully',
          });
          window.location.reload(); 
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete vehicle',
          });
        },
      });
    },
    reject: () => {
      this.messageService.add({
        severity: 'info',
        summary: 'Cancelled',
        detail: 'Vehicle Deletion Cancelled',
      });
    },
  });
}

}