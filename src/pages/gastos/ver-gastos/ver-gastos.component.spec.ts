import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerGastosComponent } from './ver-gastos.component';

describe('VerGastosComponent', () => {
  let component: VerGastosComponent;
  let fixture: ComponentFixture<VerGastosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerGastosComponent]
    });
    fixture = TestBed.createComponent(VerGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
