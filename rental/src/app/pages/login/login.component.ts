import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {LoginUserRequest} from '../../services/models/login-user-request';
import { CommonModule } from '@angular/common';
import{AuthenticationControllerService} from '../../services/services/authentication-controller.service';
import {Router} from '@angular/router';
import{Authenticate$Params} from '../../services/fn/authentication-controller/authenticate';
import {register} from '../../services/fn/authentication-controller/register';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'

})
export class LoginComponent {
 loginData: LoginUserRequest ={
   username: '',
    password:''
  };
 errorMsg: Array<string>=[];
  constructor(
    private authService: AuthenticationControllerService,
    private router: Router
  ) {}
login() {
  this.errorMsg = []; // Clear any previous errors
  const params: Authenticate$Params = {
    body: this.loginData,
  };

  this.authService.authenticate(params).subscribe(
    (token) => {
      console.log('Login successful. Token:', token);
      localStorage.setItem('authToken', token);
      this.router.navigate(['/dashboard']); // Navigate after successful login
    },
    (error) => {
      console.error('Login failed:', error);
      const errorMessage = error?.error?.message || 'Invalid username or password.';
      this.errorMsg.push(errorMessage); // Push error message to array
    }
  );
}

  register(){
    console.log("button clicked");
    this.router.navigate(['register'])
  }
}
