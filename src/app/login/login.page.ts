import { Component, OnDestroy, OnInit } from '@angular/core';
import { FirebaseService } from '../service/firebase.service';
import { ApiService } from '../service/api.service';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../service/service-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  tokenID: string = '';

  constructor(
    private firebase: FirebaseService,
    private apiService: ApiService,
    private router: Router,
    private alertcontroler: AlertController,
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.limpiarCampos(); // Asegura que los campos estén vacíos al iniciar
  }

  ngOnDestroy() {
    console.log('LoginPage destruido.');
  }

  async login() {
    try {
      // Autenticación con Firebase
      const usuario = await this.firebase.auth(this.email, this.password);
  
      // Obtiene el token desde Firebase
      this.tokenID = await usuario.user?.getIdToken() || '';
  
      console.log('Token generado desde Firebase:', this.tokenID);
  
      // Obtén el id_usuario desde la API usando el token y el correo
      const response = await this.apiService.getUserFromAPI(this.email, this.tokenID);
      if (!response.data || response.data.length === 0) {
        throw new Error('No se pudo obtener el p_id del usuario.');
      }
      const idUsuario = response.data[0].id_usuario;
  
      console.log('ID Usuario obtenido desde la API:', idUsuario);
  
      // Almacena el token en el storage
      await this.pruebaStorage();
  
      // Navegación a la página principal con parámetros
      const navigationExtras: NavigationExtras = {
        queryParams: {
          email: this.email,
          id_usuario: idUsuario, // Usamos el id_usuario de la API
        },
      };
      this.router.navigate(['/home'], navigationExtras);
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      this.popAlert();
    }
  }
  

  async pruebaStorage() {
    const jsonToken = [
      { token: this.tokenID },
      { email: this.email },
    ];
    await this.storage.agregarStorage(jsonToken);
    console.log('Datos almacenados en el storage:', await this.storage.obtenerStorage());
  }

  async popAlert() {
    const alert = await this.alertcontroler.create({
      header: 'Error',
      message: 'Usuario o contraseña incorrecta',
      buttons: ['OK'],
    });
    await alert.present();
  }

  limpiarCampos() {
    this.email = '';
    this.password = '';
  }
}
