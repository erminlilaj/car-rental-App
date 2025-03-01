import { Component,OnInit } from '@angular/core';

import { VehicleCardComponent } from '../../../app-shared-components/vehicle-card/vehicle-card.component';
import { VehicleEntity } from '../../../services/models';
import { VehicleControllerService } from '../../../services/services';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationControllerService } from '../../../services/services';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule,VehicleCardComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent  implements OnInit {
  vehicleList: VehicleEntity[] = []; 
  isAdmin: boolean=false;
  availableVehicle: number=0;
  maintenanceVehicle: number=0;


  
  constructor(private vehicleService: VehicleControllerService,
    private router: Router,
    private authService: AuthenticationControllerService,
  ) {this.authService.isAdmin().subscribe({
    next:(isAdmin:boolean)=>{
      this.isAdmin=isAdmin;
    },
    error:()=>{
      console.log("Failed to check admin status");
    }
  });
  }

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
            this.countVehicleStatus();
          };
          reader.readAsText(response); //read the blob as text
        } else {
          this.vehicleList = response; //if its already in the correct format
          this.countVehicleStatus();
        }
      },
      (error) => {
        console.error('Failed to fetch vehicles:', error);
      }
    );
  }
  private countVehicleStatus(): void {
    this.availableVehicle= this.vehicleList.filter(
      (vehicle)=> vehicle.vehicleStatus==='AVAILABLE'
    ).length;
    this.maintenanceVehicle=this.vehicleList.filter(
      (vehicle)=> vehicle.vehicleStatus==='MAINTENANCE'
    ).length;
    console.log(`Available vehicles: ${this.availableVehicle}`);
    console.log(`Maintenance vehicles: ${this.maintenanceVehicle}`);
  }
  addVehicle():void{
    this.router.navigate(['add-vehicle']);
  }
}