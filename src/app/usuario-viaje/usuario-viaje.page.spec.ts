import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuarioViajePage } from './usuario-viaje.page';

describe('UsuarioViajePage', () => {
  let component: UsuarioViajePage;
  let fixture: ComponentFixture<UsuarioViajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
