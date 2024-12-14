import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FirebaseService } from '../service/firebase.service'; // Importamos el servicio de Firebase

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.page.html',
  styleUrls: ['./actividad.page.scss'],
})
export class ActividadPage implements OnInit {
  usuarios: { nombre: string; correo: string; telefono: string }[] = [];
  loading: boolean = false;
  error: string | null = null;

  private apiUrl = `${environment.apiUrl}user/obtener`; // Endpoint de la API

  constructor(private http: HttpClient, private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.loading = true;
    this.error = null;

    // Obtenemos el token desde Firebase
    this.firebaseService.getCurrentUserToken().then((token: string | null) => {
      if (!token) {
        this.error = 'No se pudo obtener el token de autenticación.';
        this.loading = false;
        console.error('Error: Token no obtenido.');
        return;
      }

      console.log('Token obtenido:', token);

      const params = { token };
      this.http.get(this.apiUrl, { params }).subscribe(
        (response: any) => {
          console.log('Respuesta de la API:', response);

          if (response?.data) {
            // Procesar datos de usuarios según las propiedades reales
            this.usuarios = response.data.map((usuario: any) => ({
              nombre: usuario.nombre, // Ajustado a "nombre"
              correo: usuario.correo_electronico, // Ajustado a "correo_electronico"
              telefono: usuario.telefono, // Ajustado a "telefono"
            }));
            console.log('Usuarios procesados:', this.usuarios);
          } else {
            this.error = 'No se encontraron usuarios.';
          }
          this.loading = false;
        },
        (error: any) => {
          console.error('Error al obtener los usuarios:', error);
          this.error = 'Hubo un error al cargar los usuarios.';
          this.loading = false;
        }
      );
    }).catch((error: any) => {
      console.error('Error al obtener el token:', error);
      this.error = 'Hubo un problema al autenticar.';
      this.loading = false;
    });
  }
}
