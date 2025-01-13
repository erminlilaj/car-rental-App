import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ReservationsListComponent } from './pages/reservations-list/reservations-list.component';
import { CheckAvailableVehiclesComponent } from './pages/check-available-vehicles/check-available-vehicles.component';
import { Component } from '@angular/core';

import { FullComponent } from './layout/full/full.component';
import { FullAdminComponent } from './layout/full-admin/full-admin.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { VehiclesComponent } from './pages/admin/vehicles/vehicles.component';
import { AddVehicleComponent } from './pages/add-vehicle/add-vehicle.component';
import { CanActivateFn } from '@angular/router';
import { adminGuard } from './guard/admin.guard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Login page route
  { path: '', redirectTo: 'login', pathMatch: 'full' },// Fallback route
  {path: 'availableVehicles',component:CheckAvailableVehiclesComponent},
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
    component: FullAdminComponent,
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
    component: FullAdminComponent,
    canActivate: [adminGuard], 
    children: [
      {
        path: '',
        component: VehiclesComponent
      }
    ]
  },
  {path: 'add-vehicle', component: AddVehicleComponent, canActivate:[adminGuard]}
  

];

