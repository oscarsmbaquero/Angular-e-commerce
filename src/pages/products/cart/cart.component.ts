import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  unidades: number = 0;
  units: number = 1; // Inicialmente, las unidades serán 1

  total: number = 0; // Inicializamos el total en 0

  constructor(
    private storeService: StoreService,
    private router: Router,
  ){
    // this.carts = this.storeService.getCart();
    //this.calculateTotal(); // Calculamos el total al inicializar el componente
  }

  ngOnInit(){
    this.carts = this.storeService.getCart();
    const unidadesCart = this.carts.map((element)=>{
      this.unidades = element.unidades;
      console.log(element.unidades);
    })
    //this.calculateTotal(); // Calculamos el total al inicializar el componente
     // Inicializamos totalPrice para todos los artículos en la cesta
     this.carts.forEach(car => {
      car.totalPrice = car.precio * this.units;
    });
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
  incrementUnits(car: IProduct, index: number) {
    if (car.unidades >= 0) {
      this.carts[index].unidades++;
      this.carts[index].totalPrice = car.precio * car.unidades;
      this.calculateTotal(); // Si es necesario calcular el total general
    }
  }
  
  decrementUnits(car: IProduct, index: number) {
    if (car.unidades > 1) {
      this.carts[index].unidades--;
      this.carts[index].totalPrice = car.precio * car.unidades;
      this.calculateTotal(); // Si es necesario calcular el total general
    } else if (car.unidades === 1) {
      this.deleteId(car.id);
    }
  }

  calculateTotal() {
    this.total = this.carts.reduce((accumulator, car) => accumulator + (car.totalPrice || 0), 0);
  }

  navigateList(){
    console.log('Entro');
    this.router.navigate(['list']);
  }

  pay(){

  }



}
