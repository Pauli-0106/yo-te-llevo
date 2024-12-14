import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseService } from '../service/firebase.service';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private firebaseService: FirebaseService, private router: Router) {}

  canActivate() {
    return this.firebaseService.getAuthState().pipe(
      map(user => {
        console.log('Estado de autenticación:', user);
        if (user) {
          return true; 
        } else {
          this.router.navigate(['/login']); 
          return false; 
        }
      })
    );
  }
}
