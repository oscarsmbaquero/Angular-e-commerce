import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteleraProductsComponent } from './cartelera-products.component';

describe('CarteleraProductsComponent', () => {
  let component: CarteleraProductsComponent;
  let fixture: ComponentFixture<CarteleraProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarteleraProductsComponent]
    });
    fixture = TestBed.createComponent(CarteleraProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
