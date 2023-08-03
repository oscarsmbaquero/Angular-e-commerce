import { Component } from '@angular/core';

import { StoreService } from 'src/core/services/store/store.service';
import { IProduct } from 'src/core/services/models/product.models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  /**
   * almacenar la cesta
   */
  carts: IProduct[]=[];

  units: number = 1; // Inicialmente, las unidades serán 1

  total: number = 0; // Inicializamos el total en 0

  constructor(
    private storeService: StoreService
  ){
    this.carts = this.storeService.getCart();
    this.calculateTotal(); // Calculamos el total al inicializar el componente
  }
  /**
   * borrar del sessionStorage
   */
  delete(){
    this.storeService.clearCart();
    window.location.reload(); 
  }

  deleteId(cart:string){
    this.storeService.clearCartId(cart);
    window.location.reload(); 
  }

 // Función para incrementar las unidades
  // Función para incrementar las unidades y actualizar el precio total
  incrementUnits(car: IProduct) {
    this.units++;
    if (car.precio && this.units > 0) {
      car.totalPrice = car.precio * this.units; // Actualizamos el precio tota
      this.calculateTotal(); // Calculamos el total al inicializar el componentel
    }
  }

  // Función para decrementar las unidades (con límite mínimo de 1) y actualizar el precio total
  decrementUnits(car: IProduct) {
    if (this.units > 1) {
      this.units--;
      if (car.precio && this.units > 0) {
        car.totalPrice = car.precio * this.units; // Actualizamos el precio total
        this.calculateTotal(); // Calculamos el total al inicializar el componente
      }
    }
  }

  calculateTotal() {
    this.total = this.carts.reduce((accumulator, car) => accumulator + (car.totalPrice || 0), 0);
  }


}
