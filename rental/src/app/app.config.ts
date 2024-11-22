import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';

// // Example of an HTTP Interceptor
// const authInterceptor = (req, next) => {
//   const token = localStorage.getItem('token');
//   const clonedReq = req.clone({
//     setHeaders: { Authorization: `Bearer ${token}` },
//   });
//   return next(clonedReq);
// };

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    //provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideHttpClient(withFetch()),
    provideClientHydration(),
  ],
};
