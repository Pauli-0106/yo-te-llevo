import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/service/firebase.service'; 

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage {
  email = "";
  password = "";

  constructor(private firebase: FirebaseService, private router: Router) {} 

  navigateToLogin() {
    this.router.navigate(['/login']); 
  }

  async recuperar() {
    try {
      const usuario = await this.firebase.recuperar(this.email); 
      console.log(usuario);
      this.router.navigateByUrl('/login');
    } catch (error) {
      console.error("Error al recuperar contraseña:", error);
    }
  }
}
