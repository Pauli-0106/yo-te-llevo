import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  vehiculos: {
    patente: string;
    marca: string;
    modelo: string;
    anio: number;
    color: string;
    tipoCombustible: string;
  }[] = [];
  loading: boolean = false;
  error: string | null = null;

  private apiUrl = `${environment.apiUrl}vehiculo/obtener`;

  constructor(private http: HttpClient, private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.obtenerVehiculos();
  }

  obtenerVehiculos() {
    this.loading = true;
    this.error = null;

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
            // Procesar datos de vehículos
            this.vehiculos = response.data.map((vehiculo: any) => ({
              patente: vehiculo.patente,
              marca: vehiculo.marca,
              modelo: vehiculo.modelo,
              anio: vehiculo.anio,
              color: vehiculo.color,
              tipoCombustible: vehiculo.tipo_combustible,
            }));
            console.log('Vehículos procesados:', this.vehiculos);
          } else {
            this.error = 'No se encontraron vehículos.';
          }
          this.loading = false;
        },
        (error: any) => {
          console.error('Error al obtener los vehículos:', error);
          this.error = 'Hubo un error al cargar los vehículos.';
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
