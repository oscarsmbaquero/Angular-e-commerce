import { Component } from '@angular/core';
import { ConfirmCartService } from 'src/core/services/confirmCart/confirm-cart.service';


@Component({
  selector: 'app-confirm-cart',
  templateUrl: './confirm-cart.component.html',
  styleUrls: ['./confirm-cart.component.css']
})
export class ConfirmCartComponent {

   product: any;

  constructor(
    private confirmCartComponent: ConfirmCartService
  ){}
  ngOnInit() {
    this.getProductCart();
  }
  getProductCart(){
    this.product = this.confirmCartComponent.getProduct();
    console.log(this.product,'this');

  }
  // ngOninit(){
  //   this.getProductCart();
  // }

  closeModal(){
    this.confirmCartComponent.closeModal();
  }
}
