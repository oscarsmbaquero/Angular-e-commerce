import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasGastosComponent } from './graficas-gastos.component';

describe('GraficasGastosComponent', () => {
  let component: GraficasGastosComponent;
  let fixture: ComponentFixture<GraficasGastosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficasGastosComponent]
    });
    fixture = TestBed.createComponent(GraficasGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
