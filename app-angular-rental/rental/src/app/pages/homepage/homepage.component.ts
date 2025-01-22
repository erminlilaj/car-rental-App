import { Component,OnInit } from '@angular/core';

import { VehicleCardComponent } from '../../app-shared-components/vehicle-card/vehicle-card.component';
import { VehicleEntity } from '../../services/models';
import { VehicleControllerService } from '../../services/services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule,VehicleCardComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
  standalone: true
})
export class HomepageComponent implements OnInit {
  vehicleList: VehicleEntity[] = []; 

  constructor(private vehicleService: VehicleControllerService) {}

  ngOnInit(): void {
    this.getAllVehicles();
  }

  private getAllVehicles(): void {
    this.vehicleService.getAllVehicles().subscribe(
      (response) => {
        if (response instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            const vehicles = JSON.parse(reader.result as string);
            this.vehicleList = vehicles; // Assign parsed vehicles
          };
          reader.readAsText(response); //read the blob as text
        } else {
          this.vehicleList = response; //if its already in the correct format
        }
      },
      (error) => {
        console.error('Failed to fetch vehicles:', error);
      }
    );
  }
}