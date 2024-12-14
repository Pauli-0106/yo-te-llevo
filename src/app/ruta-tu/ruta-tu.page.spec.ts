import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RutaTuPage } from './ruta-tu.page';

describe('RutaTuPage', () => {
  let component: RutaTuPage;
  let fixture: ComponentFixture<RutaTuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaTuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
