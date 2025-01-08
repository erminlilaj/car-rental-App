import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationControllerService } from '../../../services/services';
import { VehicleControllerService } from '../../../services/services';
import { ReservationControllerService } from '../../../services/services';
import { VehicleEntity } from '../../../services/models';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  isAdmin: boolean = false;
  availableVehicle: number = 0;
  maintenanceVehicle: number = 0;
  completedReservations: number=0;
  cancelledReservations: number=0;
  ongoingReservations: number=0;
  futureReservations: number=0;
profitMade: number=0;
plannedProfit: number=0;
  vehicleList: VehicleEntity[] = [];

  constructor(
    private authService: AuthenticationControllerService,
    private vehicleService: VehicleControllerService,
    private reservationService: ReservationControllerService,
    private router: Router,
  ) {
    this.authService.isAdmin().subscribe({
      next: (isAdmin: boolean) => {
        this.isAdmin = isAdmin;
      },
      error: () => {
        console.log("Failed to check admin status");
      }
    });
  }

  ngOnInit(): void {
    this.countVehicleStatus();
    this.countReservationStatuses();
    this.getProfits();
  }

  

  private countVehicleStatus(): void {
    this.vehicleService.countVehicleStatuses().subscribe(
      (response: { [key: string]: {} }) => {
        
        const vehicleStatus = response as { [key: string]: number };

        this.availableVehicle= vehicleStatus['available'] || 0;
        this.maintenanceVehicle= vehicleStatus['maintenance']||0;
        console.log(`Available vehicles: ${this.availableVehicle}`);
        console.log(`Maintenance vehicless: ${this.maintenanceVehicle}`);
      },
      (error) => {
        console.error('Error fetching vehicle statuses:', error);
      }
    );
  }
  private getProfits():void {
    this.reservationService.sumReservationsProfits().subscribe(
      (response: {[key: string]: {}} )=> {
        const kProfit= response as {[key: string]: number};
        this.profitMade=kProfit['profit made'] || 0;
        this.plannedProfit=kProfit['planned profit'] || 0;

      },
      (error) => {
        console.error('Error fetching vehicle statuses:', error);
      }
    );
  }
private countReservationStatuses():void {
  this.reservationService.countReservationsStatuses().subscribe(
  (response: {[key:string]:{}})=>{
    const reservationStatus= response as {[key:string]:number};
    this.completedReservations=reservationStatus['completed']||0;
    this.ongoingReservations=reservationStatus['ongoing']|| 0;
    this.cancelledReservations=reservationStatus['cancelled']||0;
    this.futureReservations=reservationStatus['future']||0;
    console.log(`Completed reservations: ${this.completedReservations}`);
    console.log(`Future reservations: ${this.futureReservations}`);
    console.log(`Ongoing reservations: ${this.ongoingReservations}`);
    console.log(`Cancelled reservations: ${this.cancelledReservations}`);
  }
  )
}

vehicles(): void{
this.router.navigate(['admin/vehicles']);
}


}
