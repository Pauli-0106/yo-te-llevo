import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuarioYoPage } from './usuario-yo.page';

describe('UsuarioYoPage', () => {
  let component: UsuarioYoPage;
  let fixture: ComponentFixture<UsuarioYoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioYoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
