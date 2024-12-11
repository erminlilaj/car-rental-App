import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ReservationsListComponent } from './pages/reservations-list/reservations-list.component';
import { Component } from '@angular/core';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FullComponent } from './layout/full/full.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { VehiclesComponent } from './pages/admin/vehicles/vehicles.component';
import { CanActivateFn } from '@angular/router';
import { adminGuard } from './guard/admin.guard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Login page route
  //{ path: '**', redirectTo: 'login' },         // Fallback route
  {path: 'register', component: RegisterComponent},
  {path: 'homepage', component: FullComponent,children: [
    {
    path: '',
    component: HomepageComponent
    }
  ]},
  {path: 'reservation/:id', component: FullComponent,children: [
    {
    path: '',
    component: ReservationComponent
    }
  ]},
  {path:'reservations-list',component:FullComponent,children:[
    {
      path: '',
      component: ReservationsListComponent
    }
  ]},

  {
    path: 'admin',
    component: FullComponent,
    canActivate: [adminGuard], 
    children: [
      {
        path: '',
        component: AdminDashboardComponent
      }
    ]
  },
  {
  path: 'admin/vehicles',
    component: FullComponent,
    canActivate: [adminGuard], 
    children: [
      {
        path: '',
        component: VehiclesComponent
      }
    ]
  }
  

];

