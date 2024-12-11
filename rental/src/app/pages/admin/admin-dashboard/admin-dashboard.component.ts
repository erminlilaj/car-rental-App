import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationControllerService } from '../../../services/services';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  
  isAdmin: boolean=false;

constructor(
  private authService: AuthenticationControllerService,
  private router: Router,
){this.authService.isAdmin().subscribe({
  next:(isAdmin:boolean)=>{
    this.isAdmin=isAdmin;
  },
  error:()=>{
    console.log("Failed to check admin status");
  }
});
}


vehicles(): void{
this.router.navigate(['admin/vehicles']);
}


}
