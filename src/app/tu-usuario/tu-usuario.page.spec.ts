import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TuUsuarioPage } from './tu-usuario.page';

describe('TuUsuarioPage', () => {
  let component: TuUsuarioPage;
  let fixture: ComponentFixture<TuUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TuUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
