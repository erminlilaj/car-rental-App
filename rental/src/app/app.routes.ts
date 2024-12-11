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
  ]}

  // { path: '/user/dashboard', component: FullComponent, children: [
  //   {
  //     path: '',
  //     component: LoginComponent
  //   }
  // ] }

];

