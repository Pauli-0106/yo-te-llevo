import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-viaje',
  templateUrl: './usuario-viaje.page.html',
  styleUrls: ['./usuario-viaje.page.scss'],
})
export class UsuarioViajePage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('UsuarioViajePage cargado correctamente');
  }

}
