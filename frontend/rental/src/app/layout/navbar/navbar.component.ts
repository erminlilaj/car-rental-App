import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationControllerService } from '../../services/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true
})
export class NavbarComponent  {
  // userId!: number;

  constructor(
    private authService: AuthenticationControllerService,
    private router: Router
  ) {}

  // ngOnInit(): void {
  //   this.authService.getLoggedUserId().subscribe({
  //     next: (id) => {
  //       this.userId = id;
  //       console.log('User ID:', this.userId);
  //     },
  //     error: (err) => {
  //       console.error('Failed to fetch user ID:', err);
  //     }
  //   });
  // }
navigateToHomepage(): void{
  this.router.navigate([`homepage`]);
}
logout():void{
  localStorage.removeItem('authToken'); 
  localStorage.removeItem('redirectUrl');
  this.router.navigate(['/login']);
}
  navigateToReservations(): void {
    // if (this.userId) {
      this.router.navigate([`reservations-list`]);
    //   console.log('Navigating to reservations for User ID:', this.userId);
    // } else {
    //   console.error('User ID is not available');
    // }
  }
}
