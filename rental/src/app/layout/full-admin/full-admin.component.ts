import { Component } from '@angular/core';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-full-admin',
  standalone: true,
  imports: [AdminNavbarComponent,RouterOutlet],
  templateUrl: './full-admin.component.html',
  styleUrl: './full-admin.component.scss'
})
export class FullAdminComponent {

}
