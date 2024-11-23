import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterUserRequest } from '../../services/models/register-user-request';
import { CommonModule } from '@angular/common';
import { AuthenticationControllerService } from '../../services/services/authentication-controller.service';
import { Register$Params } from '../../services/fn/authentication-controller/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  registerData: RegisterUserRequest= {
    name: '',
    surname: '',
    username:'',
    email: '',
    age: 0,
    password: ''
  };
  errorMsg: Array<string>=[];
  constructor(
    private authService: AuthenticationControllerService,
    private router: Router
  ){}
  register() {
    this.errorMsg = []; // Clear previous errors
    const params: Register$Params = {
      body: this.registerData
    };

    this.authService.register(params).subscribe(
      () => {
        console.log('Registration successful');
        
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed:', error);
        //todo error msg
        const errorMessage = error?.error?.message || `Error ${error?.statusText}: An unexpected error occurred.`;
      
        
        this.errorMsg.push(errorMessage);
      }
    );
  }
  login(){
    console.log("button clicked");
    this.router.navigate(['login'])
  }
}
