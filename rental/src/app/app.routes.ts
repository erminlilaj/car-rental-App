import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Login page route
  { path: '**', redirectTo: 'login' },         // Fallback route
  {path: "register", component:RegisterComponent}
];

