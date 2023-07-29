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

  constructor(
    private storeService: StoreService
  ){
    this.carts = this.storeService.getCart();
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
}
