import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DondeVoyPage } from './donde-voy.page';

describe('DondeVoyPage', () => {
  let component: DondeVoyPage;
  let fixture: ComponentFixture<DondeVoyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DondeVoyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
