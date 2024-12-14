import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../service/firebase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle-viaje',
  templateUrl: './detalle-viaje.page.html',
  styleUrls: ['./detalle-viaje.page.scss'],
})
export class DetalleViajePage implements OnInit {
  ubicacionOrigen: string = '';
  ubicacionDestino: string = '';
  costo: number | null = null;
  idVehiculo: string | null = null; // Almacenamos el p_id_vehiculo automáticamente
  idUsuario: string = '';
  private apiUrlViaje = `${environment.apiUrl}viaje/agregar`;
  private apiUrlVehiculo = `${environment.apiUrl}vehiculo/obtener`;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.idUsuario = params['id_usuario'];
      console.log('ID Usuario recibido:', this.idUsuario);

      // Llamar a la API para obtener el p_id_vehiculo
      this.obtenerIdVehiculo();
    });
  }

  obtenerIdVehiculo() {
    this.firebaseService.getCurrentUserToken().then((token: string | null) => {
      if (!token) {
        console.error('Token no disponible.');
        return;
      }

      const params = { p_id: this.idUsuario, token };

      this.http.get(this.apiUrlVehiculo, { params }).subscribe(
        (response: any) => {
          console.log('Respuesta de la API (vehículo):', response);

          if (response?.data?.length > 0) {
            const vehiculo = response.data[0]; // Tomamos el primer vehículo
            this.idVehiculo = vehiculo.id_vehiculo;
            console.log('ID Vehículo obtenido:', this.idVehiculo);
          } else {
            console.warn('No se encontró ningún vehículo registrado para el usuario.');
            this.idVehiculo = null;
          }
        },
        error => {
          console.error('Error al obtener el vehículo:', error);
          this.idVehiculo = null;
        }
      );
    });
  }

  crearViaje() {
    if (!this.idVehiculo) {
      alert('No se encontró un vehículo registrado. Registra uno antes de continuar.');
      return;
    }

    this.firebaseService.getCurrentUserToken().then((token: string | null) => {
      if (!token) {
        console.error('Token no disponible.');
        return;
      }

      const body = {
        p_id_usuario: this.idUsuario,
        p_ubicacion_origen: this.ubicacionOrigen,
        p_ubicacion_destino: this.ubicacionDestino,
        p_costo: this.costo,
        p_id_vehiculo: this.idVehiculo,
        token,
      };

      this.http.post(this.apiUrlViaje, body).subscribe(
        response => {
          console.log('Viaje creado exitosamente:', response);
          alert('Viaje creado correctamente.');
          this.router.navigate(['/home']); // Redirigir al home
        },
        error => {
          console.error('Error al crear el viaje:', error);
          alert('Hubo un error al crear el viaje.');
        }
      );
    });
  }
}
