import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ReservationResponse } from '../../services/models';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [ CommonModule, 
    TableModule, 
    ButtonModule],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.scss'
})
export class ReservationListComponent implements OnInit {
reservations: ReservationResponse[]=[];
vehicleId: number| undefined;
constructor(
  public ref: DynamicDialogRef,
  public config: DynamicDialogConfig
) {}
ngOnInit(): void {
  this.reservations=this.config.data?.reservations || [];
  this.vehicleId= this.config.data?.vehicleId;
}

closeDialog(deleteConfirmed: boolean): void {
  console.log('closeDialog triggered with:', deleteConfirmed); // Debugging log
  this.ref.close(deleteConfirmed);
}


}
