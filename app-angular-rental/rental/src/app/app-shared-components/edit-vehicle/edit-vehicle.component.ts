import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { VehicleControllerService } from '../../services/services';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-edit-vehicle',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule],
  templateUrl: './edit-vehicle.component.html',
  styleUrl: './edit-vehicle.component.scss'
})
export class EditVehicleComponent {
vehicleForm: FormGroup;
vehicleStatus = ['AVAILABLE', 'MAINTENANCE'];

constructor(
  private formBuilder: FormBuilder,
  private vehicleService: VehicleControllerService,
  private messageService: MessageService,
  private dialogRef: DynamicDialogRef,
  private config: DynamicDialogConfig
){
  this.vehicleForm = this.formBuilder.group({
    model: ['', Validators.required],
    color: ['', Validators.required],
    dailyFee: [0, [Validators.required, Validators.min(0)]],
    vehicleStatus: ['AVAILABLE', Validators.required]
  });

}

ngOnInit(){
  const vehicleId= this.config.data.vehicleId;

  this.vehicleService.getVehicleById({id: vehicleId}).subscribe({
    next: (vehicle)=>{
      this.vehicleForm.patchValue({
        model: vehicle.model,
        color: vehicle.color,
        dailyFee:vehicle.dailyFee,
        vehicleStatus: vehicle.vehicleStatus
      });
    },
    error: (error)=>{
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load vehicle details'
      });
      this.dialogRef.close();
    }
  });
}

onSubmit() {
  if (this.vehicleForm.valid) {
    const vehicleId = this.config.data.vehicleId;
    console.log("to be updated");
    const updateData = {
      id: vehicleId,
      body: this.vehicleForm.value 
       
    };

    this.vehicleService.updateVehicle(updateData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Vehicle updated successfully'
        });
        this.dialogRef.close(true);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update vehicle'
        });
      }
    });
  }
}
onCancel() {
  this.dialogRef.close(false);
}
}