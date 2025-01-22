import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-full',
  imports: [NavbarComponent,RouterOutlet],
  templateUrl: './full.component.html',
  styleUrl: './full.component.scss',
  standalone: true
})
export class FullComponent {

}
