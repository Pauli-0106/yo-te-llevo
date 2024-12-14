import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-apitest',
  templateUrl: './apitest.page.html',
  styleUrls: ['./apitest.page.scss'],
})
export class ApitestPage implements OnInit {

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.testAgregarUsuario();
    this.testObtenerUsuario();
  }

  async testAgregarUsuario() {
    try {
      // Datos de prueba para el registro de usuario
      const testUser = {
        p_nombre: 'Test Usuario',
        email: 'test@example.com',
        p_telefono: '123456789',
        token: 'testToken123' // Cambia esto por un token válido si es necesario
      };
  
      // Crear un archivo de prueba para la imagen
      const testImage = new File(['contenido de prueba'], 'imagen_prueba.jpg', { type: 'image/jpeg' });
  
      const response = await this.api.agregarUsuario(testUser, testImage);
      console.log('Respuesta al agregar usuario:', response);
    } catch (error) {
      console.error('Error al probar agregar usuario:', error);
    }
  }
  

  async testObtenerUsuario() {
    try {
      // Datos de prueba para obtener un usuario
      const testParams = {
        p_correo: 'test@example.com', // Correo del usuario a buscar
        token: 'testToken123' // Cambia esto por un token válido
      };

      const response = await this.api.obtenerUsuario(testParams);
      console.log('Respuesta al obtener usuario:', response);
    } catch (error) {
      console.error('Error al probar obtener usuario:', error);
    }
  }
}
