import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../app/service/firebase.service'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  email: string | null = '1133@1133.com';

  constructor(private router: Router, private firebaseService: FirebaseService) {} 

  goToProfile() {
    this.router.navigate(['/profile']); 
  }

  logout() {
    this.firebaseService.logOut().then(() => { 
      console.log("Usuario ha cerrado sesión");
      this.router.navigate(['/login']);
    }).catch((error: any) => { 
      console.error("Error al cerrar sesión:", error);
    });
  }
}
