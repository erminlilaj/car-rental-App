import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationControllerService } from '../services/services';
import { map, catchError, of } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthenticationControllerService);

  return authService.isAdmin().pipe(
    map((isAdmin: boolean) => {
      if (isAdmin) {
        return true;
      } else {
        router.navigate(['login']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
