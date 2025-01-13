import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VehicleCardComponent } from '../../app-shared-components/vehicle-card/vehicle-card.component';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ReservationControllerService } from '../../services/services';
import { VehicleResponse } from '../../services/models';

@Component({
  selector: 'app-check-available-vehicles',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    FormsModule,
    ButtonModule,
    MessageModule,
    ToastModule,
    RouterModule,
    VehicleCardComponent
  ],
  templateUrl: './check-available-vehicles.component.html',
  styleUrls: ['./check-available-vehicles.component.scss'],
  providers: [MessageService]
})
export class CheckAvailableVehiclesComponent {
  rangeDates: Date[] = [];
  availableVehicles: VehicleResponse[] = [];
  minDate: Date = new Date();
  loading: boolean = false;

  constructor(
    private reservationService: ReservationControllerService,
    private messageService: MessageService
  ) {}

  searchAvailableVehicles(): void {
    if (!this.rangeDates || this.rangeDates.length !== 2) {
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

    this.loading = true;
    const searchRequest = {
      body: {
        startDate: this.formatDateForBackend(startDate),
        endDate: this.formatDateForBackend(endDate)
      }
    };

    this.reservationService.getAvailableVehiclesByDate(searchRequest)
      .subscribe({
        next: (response: any) => {
          console.log('Received response:', response);
          
          // Handle Blob response
          if (response instanceof Blob) {
            const reader = new FileReader();
            reader.onload = () => {
              const jsonResponse = JSON.parse(reader.result as string);
              console.log('Parsed vehicles:', jsonResponse);
              this.availableVehicles = jsonResponse;
              
              if (this.availableVehicles.length === 0) {
                this.messageService.add({
                  severity: 'info',
                  summary: 'No Vehicles',
                  detail: 'No vehicles available for the selected dates'
                });
              } else {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Vehicles Found',
                  detail: `Found ${this.availableVehicles.length} available vehicles`
                });
              }
            };
            reader.readAsText(response);
          }
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          console.error('Search Error:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Search Failed',
            detail: error.error?.message || 'Failed to search for available vehicles'
          });
        }
      });
  }

  private formatDateForBackend(date: Date): string {
    return date.toISOString();
  }
}