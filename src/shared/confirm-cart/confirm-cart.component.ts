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

   showEnvio= false;

   textEnvio='Si tienes mas articulos en la cesta por valor superior a 50 €, el envío es gratis';

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

  closeModal(event?:Event){
    this.confirmCartComponent.closeModal();
    event?.stopPropagation();
    this.router.navigate(['list'])
  }
  goCart(event: Event) {
    this.closeModal(event);
    this.router.navigate(['cesta']);
  }
  goList(event: Event) {
    this.closeModal(event);
    this.router.navigate(['list']);
  }

  calcularPrecioConEnvio(precioProducto: number): number {
    if(precioProducto > 49){
      this.showEnvio= false;
      return precioProducto     
    }else{
      this.showEnvio= true;
      return precioProducto + 12;
      
    }
  }
  // calcularPrecioFinal(precioProducto: number): number {
  //   if(precioProducto >= 48){
  //     return precioProducto
  //   }else{
  //     return precioProducto + 12;
  //   }
  // }
  
}
