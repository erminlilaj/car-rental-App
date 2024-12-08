import { Component, Input } from '@angular/core';
import { VehicleEntity } from '../../services/models/vehicle-entity';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-card',
  imports: [CommonModule],
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss'],
  standalone: true
})
export class VehicleCardComponent {
  private _vehicle: VehicleEntity = {};
  constructor(
   
    private router: Router
  ) {}
  @Input()
  set vehicle(value: VehicleEntity) {
    this._vehicle = value;
    //this.vehicleName = value.make + ' ' + value.model;
  }

  get vehicle(): VehicleEntity {
    return this._vehicle;
  }
  
  onReservation(vehicleId: number | undefined) {
    console.log("button clicked", vehicleId);
    this.router.navigate([`reservation/${vehicleId}`]);
  }
}
