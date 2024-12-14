import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../service/firebase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ruta-tu',
  templateUrl: './ruta-tu.page.html',
  styleUrls: ['./ruta-tu.page.scss'],
})
export class RutaTuPage implements OnInit {
  idUsuario: string = ''; // ID del usuario recibido como query param
  viajes: any[] = []; // Lista de viajes
  loading: boolean = false; // Indicador de carga
  error: string | null = null; // Mensaje de error

  private apiUrl = `${environment.apiUrl}viaje/obtener`; // URL del endpoint

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idUsuario = params['id_usuario']; // Asegúrate de que el parámetro coincide
      console.log('ID Usuario recibido:', this.idUsuario);

      this.obtenerViajes(); // Llamar al método para obtener viajes
    });
  }

  obtenerViajes() {
    this.loading = true; // Iniciar el estado de carga
    this.error = null; // Reiniciar el mensaje de error

    // Obtener el token de Firebase
    this.firebaseService.getCurrentUserToken().then((token: string | null) => {
      if (!token) {
        console.error('No se pudo obtener el token.');
        this.error = 'Error al autenticar. Intenta nuevamente.';
        this.loading = false;
        return;
      }

      // Construir los parámetros de la solicitud
      const params = {
        p_id_usuario: this.idUsuario,
        p_id: '1', // Estado del viaje
        token,
      };

      console.log('Parámetros enviados a la API:', params);

      // Realizar la solicitud GET
      this.http.get(this.apiUrl, { params }).subscribe(
        (response: any) => {
          console.log('Respuesta de la API:', response);

          if (response?.data?.length > 0) {
            // Transformar los datos de los viajes
            this.viajes = response.data.map((viaje: any) => ({
              origen: viaje.ubicacion_origen,
              destino: viaje.ubicacion_destino,
              costo: viaje.costo,
              vehiculo: viaje.id_vehiculo,
            }));
          } else {
            this.viajes = [];
            console.log('No se encontraron viajes en estado 1.');
          }

          this.loading = false; // Finalizar la carga
        },
        error => {
          console.error('Error al obtener los viajes:', error);
          this.error = 'Hubo un error al cargar los viajes.';
          this.loading = false;
        }
      );
    }).catch(error => {
      console.error('Error al obtener el token:', error);
      this.error = 'Hubo un problema al autenticar.';
      this.loading = false;
    });
  }
}
