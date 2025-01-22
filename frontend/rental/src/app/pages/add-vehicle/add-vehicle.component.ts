import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehicleControllerService } from '../../services/services';
import { Router } from '@angular/router';
import { CreateVehicle$Params } from '../../services/fn/vehicle-controller/create-vehicle';
import { CreateVehicleRequest,  } from '../../services/models';


@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.scss'
})
export class AddVehicleComponent {
  vehicleData: CreateVehicleRequest = {
    brand: undefined,
    color: undefined,
    dailyFee: undefined,
    fuelType: undefined,
    gearboxType: undefined,
    model: undefined,
    vehicleStatus: undefined,
    year: undefined
  };

 
  fuelTypes = ['DIESEL', 'PETROL', 'ELECTRIC'];
  gearboxTypes = ['AUTOMATIC', 'MANUAL'];
  vehicleStatuses = ['AVAILABLE', 'MAINTENANCE'];

  
  selectedImageBlob: Blob | undefined=undefined;

  errorMsg: string[]=[];
  constructor(
    private vehicleService: VehicleControllerService,
    private router: Router
  ){}


    // Handle image selection
    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedImageBlob = input.files[0];
      }
    } 

  addVehicle(){
    this.errorMsg=[];
    const params: CreateVehicle$Params={
      body: {
        vehicleData:this.vehicleData,
        image: this.selectedImageBlob, 
      },
    };
    this.vehicleService.createVehicle(params).subscribe({
      next: (response) => {
        
        this.router.navigate(['admin/vehicles']); 
      },
      error: (error) => {
        
        this.errorMsg = [error.message || 'Failed to add vehicle'];
      }
    });
  }
  cancel():void{
    this.router.navigate(['admin/vehicles']);
  }
  
}
