import { Component, Input, OnInit } from '@angular/core';
import { VehicleEntity } from '../../services/models/vehicle-entity';
import { VehicleControllerService } from '../../services/services';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GetVehicleImage$Params } from '../../services/fn/vehicle-controller/get-vehicle-image';

@Component({
  selector: 'app-vehicle-card',
  imports: [CommonModule],
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss'],
  standalone: true
})
export class VehicleCardComponent implements OnInit {
  private _vehicle: VehicleEntity = {};
  imageUrl: string = ''; // Store the fetched image URL
  @Input() isAdmin: boolean = false;

  constructor(
    private router: Router,
    private vehicleService: VehicleControllerService
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
    const params: GetVehicleImage$Params = { imagePath }; // Create the expected parameter object
    this.vehicleService.getVehicleImage(params).subscribe({
      next: (imageBlob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result as string; // Assign the image data URL
        };
        reader.readAsDataURL(imageBlob); // Convert Blob to data URL
      },
      error: () => {
        console.error('Failed to fetch vehicle image');
        this.imageUrl = 'https://via.placeholder.com/150'; // Fallback image
      },
    });
  }
  

  onReservation(vehicleId: number | undefined) {
    console.log('button clicked', vehicleId);
    this.router.navigate([`reservation/${vehicleId}`]);
  }
}
