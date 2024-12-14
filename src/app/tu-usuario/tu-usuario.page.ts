import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageService } from '../service/service-storage.service'; // Asegúrate de importar el servicio de almacenamiento

@Component({
  selector: 'app-tu-usuario',
  templateUrl: './tu-usuario.page.html',
  styleUrls: ['./tu-usuario.page.scss'],
})
export class TuUsuarioPage {
  idUsuario: string = ''; // Obtenido desde los queryParams
  idVehiculo: string = '';
  patente: string = '';
  marca: string = '';
  modelo: string = '';
  anio: number | null = null;
  color: string = '';
  tipoCombustible: string = '';
  imagen: File | null = null;
  imagenPrevia: string | ArrayBuffer | null = null;

  private apiUrl = environment.apiUrl;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private storage: StorageService // Agregado StorageService
  ) {
    // Obtenemos el idUsuario desde los queryParams
    this.activatedRoute.queryParams.subscribe(params => {
      this.idUsuario = params['id_usuario'] || ''; // Asignamos el id_usuario
      console.log('ID Usuario recibido:', this.idUsuario);
    });
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imagen = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPrevia = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.imagen = null;
    }
  }

  async registrarVehiculo() {
    try {
      if (!this.imagen) {
        throw new Error('Debe seleccionar una imagen del vehículo.');
      }

      const dataStorage = await this.storage.obtenerStorage(); // Obtener el token del almacenamiento
      const token = dataStorage[0]?.token || '';

      if (!token) {
        throw new Error('Token no válido o no disponible.');
      }

      const formData = new FormData();
      formData.append('p_id_usuario', this.idUsuario);
      formData.append('p_id_vehiculo', this.idVehiculo);
      formData.append('p_patente', this.patente);
      formData.append('p_marca', this.marca);
      formData.append('p_modelo', this.modelo);
      formData.append('p_anio', this.anio ? this.anio.toString() : '');
      formData.append('p_color', this.color);
      formData.append('p_tipo_combustible', this.tipoCombustible);
      formData.append('imagen', this.imagen);
      formData.append('token', token);

      const headers = new HttpHeaders();
      const response = await this.http
        .post(`${this.apiUrl}vehiculo/agregar`, formData, { headers })
        .toPromise();

      

      console.log('Vehículo registrado exitosamente:', response);
      this.router.navigate(['/home'], { queryParams: { id_usuario: this.idUsuario } });
    } catch (error) {
      console.error('Error al registrar el vehículo:', error);
      
    }
  }

  abrirInputFile() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLElement;
    fileInput.click();
  }
}
