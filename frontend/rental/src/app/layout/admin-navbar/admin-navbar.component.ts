import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MenubarModule
  ],
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent {
  items: MenuItem[];

  constructor(private router: Router) {
    this.items = [
      {
        label: 'Vehicles',
        icon: 'pi pi-car',
        command: () => this.navigateTo('vehicles')
      },
      {
        label: 'Users',
        icon: 'pi pi-users',
        routerLink: ['/admin/users']
      },
      {
        label: 'Reservations',
        icon: 'pi pi-calendar',
        command: () => this.navigateTo('reservations')
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.logout()
      }
    ];
  }
adminDashboard():void{
  this.router.navigate(['/admin']);
}
  navigateTo(route: string): void {
    this.router.navigate([`/admin/${route}`]);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
