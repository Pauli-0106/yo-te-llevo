import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  email: string = '';
  idUsuario: string = '';

  constructor(
    private activate: ActivatedRoute,
    private router: Router, // Agregado Router al constructor
    private firebaseService: FirebaseService // Agregado FirebaseService al constructor
  ) {
    this.activate.queryParams.subscribe(params => {
      this.email = params['email'];
      this.idUsuario = params['id_usuario']; // Este `id_usuario` ya es el `p_id` de la API
      console.log('Email recibido en Home:', this.email);
      console.log('ID Usuario recibido en Home (p_id):', this.idUsuario);
    });
  }

  goToProfile() {
    this.router.navigate(['/profile']); // Ajusta esta ruta según la configuración de tu aplicación
  }

  logout() {
    this.firebaseService
      .logOut()
      .then(() => {
        console.log('Usuario ha cerrado sesión');
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error('Error al cerrar sesión:', error);
      });
  }

  goToUsuarioViaje() {
    console.log('Navegando a usuario-viaje');
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur(); // Forzar que el botón pierda el foco antes de navegar
    }
    this.router
      .navigate(['/usuario-viaje'])
      .then(navegado => {
        console.log('¿Se navegó exitosamente?', navegado);
      })
      .catch(error => {
        console.error('Error al intentar navegar a /usuario-viaje:', error);
      });
  }

  goToTuUsuario() {
    const navigationExtras = { queryParams: { id_usuario: this.idUsuario } }; // Pasamos el id_usuario al navegar
    this.router.navigate(['/tu-usuario'], navigationExtras);
  }
  goToActividad() {
    const navigationExtras = { queryParams: { id_usuario: this.idUsuario } }; // Pasamos el id_usuario al navegar
    this.router.navigate(['/actividad'], navigationExtras);
  }
  goToVehiculos() {
    const navigationExtras = { queryParams: { id_usuario: this.idUsuario } }; // Pasamos el id_usuario al navegar
    this.router.navigate(['/principal'], navigationExtras); // Navegamos a la página principal
  }
  goToDetalleViaje() {
    const navigationExtras = { queryParams: { id_usuario: this.idUsuario } }; // Pasamos el id_usuario al navegar
    this.router.navigate(['/detalle-viaje'], navigationExtras); // Navegamos a la página detalle-viaje
  }
  goToRutaTu() {
    const navigationExtras = { queryParams: { p_id_usuario: this.idUsuario } }; // Cambiado a p_id_usuario
    this.router.navigate(['/ruta-tu'], navigationExtras); // Navegamos a la página ruta-tu
  }
  
}
