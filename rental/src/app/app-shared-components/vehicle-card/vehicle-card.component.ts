import { Component, Input } from '@angular/core';
import { VehicleEntity } from '../../services/models/vehicle-entity';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss']
})
export class VehicleCardComponent {
  private _vehicle: VehicleEntity = {};

  @Input()
  set vehicle(value: VehicleEntity) {
    this._vehicle = value;
    ///this.vehicleName = value.make + ' ' + value.model;
  }

  get vehicle(): VehicleEntity {
    return this._vehicle;
  }
}
