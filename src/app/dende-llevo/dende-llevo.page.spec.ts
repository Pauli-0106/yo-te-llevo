import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DendeLlevoPage } from './dende-llevo.page';

describe('DendeLlevoPage', () => {
  let component: DendeLlevoPage;
  let fixture: ComponentFixture<DendeLlevoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DendeLlevoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
