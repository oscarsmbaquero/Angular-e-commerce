import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGastosComponent } from './anadirGastos.component';

describe('GastosComponent', () => {
  let component: AddGastosComponent;
  let fixture: ComponentFixture<AddGastosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddGastosComponent]
    });
    fixture = TestBed.createComponent(AddGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
