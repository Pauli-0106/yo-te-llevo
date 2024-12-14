import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../service/firebase.service';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-yo',
  templateUrl: './usuario-yo.page.html',
  styleUrls: ['./usuario-yo.page.scss'],
})
export class UsuarioYoPage implements OnInit {
  email: string = '';
  password: string = '';
  nombre: string = '';
  telefono: string = '';
  archivoImagen: File | null = null;
  profileImage: string | ArrayBuffer | null = null;

  constructor(
    private firebase: FirebaseService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {}

  async registrar() {
    try {
      console.log('Datos ingresados:', {
        nombre: this.nombre,
        email: this.email,
        password: this.password,
        telefono: this.telefono,
        archivoImagen: this.archivoImagen,
      });

      // Validar campos
      if (!this.nombre.trim()) throw new Error('El campo Nombre está vacío.');
      if (!this.email.trim()) throw new Error('El campo Email está vacío.');
      if (!this.password.trim()) throw new Error('El campo Contraseña está vacío.');
      if (!this.telefono.trim()) throw new Error('El campo Teléfono está vacío.');
      if (!this.archivoImagen) throw new Error('Por favor, selecciona una imagen.');

      // Registrar en Firebase
      const usuario = await this.firebase.registrar(this.email, this.password);
      const token = await usuario.user?.getIdToken();
      if (!token) throw new Error('No se pudo obtener el token.');

      // Enviar datos a la API
      const response = await this.apiService.agregarUsuario(
        {
          p_nombre: this.nombre,
          email: this.email,
          p_telefono: this.telefono,
          token: token,
        },
        this.archivoImagen
      );

      console.log('Usuario registrado correctamente:', response);
      this.router.navigateByUrl('login');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error al registrar usuario:', error.message);
      } else {
        console.error('Error desconocido al registrar usuario:', error);
      }
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.archivoImagen = file; // Asignar archivo seleccionado
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result; // Previsualización
      };
      reader.readAsDataURL(file);
    } else {
      this.archivoImagen = null;
    }
    console.log('Archivo seleccionado:', this.archivoImagen);
  }

  selectImage() {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click(); // Abre el explorador de archivos
    } else {
      console.error('No se encontró el input de tipo file.');
    }
  }
}
