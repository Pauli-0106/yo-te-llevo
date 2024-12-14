import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RutaYoPage } from './ruta-yo.page';

describe('RutaYoPage', () => {
  let component: RutaYoPage;
  let fixture: ComponentFixture<RutaYoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaYoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
