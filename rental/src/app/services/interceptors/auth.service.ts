import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 403) {
        localStorage.removeItem('authToken'); // Clear token
        router.navigate(['/login']); // Redirect to login
      }
      throw error;
    })
  );
};