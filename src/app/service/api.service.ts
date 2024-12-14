import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, lastValueFrom, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';

export interface bodyUser {
  p_nombre: string;
  email: string;
  p_telefono: string;
  token?: string;
}

export interface dataGetUser {
  p_correo: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  apiUrl = environment.apiUrl; // Actualizamos la URL base

  constructor(private http: HttpClient) {}

  async agregarUsuario(data: bodyUser, imageFile: File) {
    try {
      const formData = new FormData();
      formData.append('p_nombre', data.p_nombre);
      formData.append('p_correo_electronico', data.email);
      formData.append('p_telefono', data.p_telefono);
      formData.append('token', data.token || '');
  
      if (imageFile) {
        formData.append('image_usuario', imageFile, imageFile.name);
      } else {
        throw new Error('La imagen es obligatoria para este endpoint.');
      }
  
      console.log('Datos enviados al servidor:', formData); // Depuración
  
      const response = await lastValueFrom(
        this.http.post<any>(this.apiUrl + 'user/agregar', formData)
      );
      console.log('Respuesta de la API:', response); // Para depurar
      return response;
    } catch (error) {
      console.error('Error en agregarUsuario:', error);
      throw error;
    }
  }
  
  
  

  async obtenerUsuario(data: dataGetUser) {
    try {
      const params = {
        p_correo: data.p_correo,
        token: data.token
      };
      const response = await lastValueFrom(
        this.http.get<any>(this.apiUrl + 'user/obtener', { params }).pipe(
          retry(3),
          catchError((error) => throwError(() => new Error(`Error al obtener usuario: ${error.message}`)))
        )
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  async registrarVehiculo(
    idUsuario: string,
    idVehiculo: string,
    patente: string,
    marca: string,
    modelo: string,
    anio: number,
    color: string,
    tipoCombustible: string,
    imagen: File
  ) {
    try {
      const formData = new FormData();
      formData.append('idUsuario', idUsuario);
      formData.append('idVehiculo', idVehiculo);
      formData.append('patente', patente);
      formData.append('marca', marca);
      formData.append('modelo', modelo);
      formData.append('anio', anio.toString());
      formData.append('color', color);
      formData.append('tipoCombustible', tipoCombustible);
  
      if (imagen) {
        formData.append('imagenVehiculo', imagen, imagen.name);
      } else {
        throw new Error('La imagen del vehículo es obligatoria.');
      }
  
      console.log('Datos enviados al servidor:', formData); // Depuración
  
      const url = `${this.apiUrl}vehiculo/agregar`; // Endpoint del backend
      const response = await lastValueFrom(
        this.http.post<any>(url, formData).pipe(
          catchError((error) =>
            throwError(() => new Error(`Error al registrar vehículo: ${error.message}`))
          )
        )
      );
      console.log('Respuesta de la API:', response); 
      return response;
    } catch (error) {
      console.error('Error en registrarVehiculo:', error);
      throw error;
    }
  }
  async getUserFromAPI(email: string, token: string): Promise<any> {
    const url = `${environment.apiUrl}user/obtener`;
    const params = {
      p_correo: email,
      token: token,
    };
  
    try {
      const response = await this.http.get<any>(url, { params }).toPromise();
      console.log('Respuesta de la API al obtener usuario:', response);
      return response;
    } catch (error) {
      console.error('Error al obtener el usuario desde la API:', error);
      throw new Error('No se pudo obtener el usuario desde la API.');
    }
  }
  
  
  
}
