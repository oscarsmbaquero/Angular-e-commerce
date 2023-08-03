import { Component } from '@angular/core';
import { ConfirmCartService } from 'src/core/services/confirmCart/confirm-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-cart',
  templateUrl: './confirm-cart.component.html',
  styleUrls: ['./confirm-cart.component.css']
})
export class ConfirmCartComponent {

   product: any;

  constructor(
    private confirmCartComponent: ConfirmCartService,
    private router:Router,
  ){}
  ngOnInit() {
    this.getProductCart();
  }
  getProductCart(){
    this.product = this.confirmCartComponent.getProduct();

  }
  // ngOninit(){
  //   this.getProductCart();
  // }

  closeModal(event:Event){
    this.confirmCartComponent.closeModal();
    event.stopPropagation();
  }
  goCart(event: Event) {
    this.router.navigate(['cesta']);
    this.closeModal(event);
  }
}
