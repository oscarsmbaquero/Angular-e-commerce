import { StoreService } from './../../../core/services/store/store.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/core/services/models/product.models';
//servicio  modal
import { ConfirmCartService } from 'src/core/services/confirmCart/confirm-cart.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  products:IProduct[]=[];


  constructor(
    private storeService: StoreService,
    private router: Router,
    private confirmCartService: ConfirmCartService
  ){

  }

  ngOnInit(){
   this.getProducts();
  
  }

  private getProducts() {
    this.storeService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  confirmAndAddtoCart(product: any){
    this.addToCart(product);
    this.openConfirmCart(product);

  }

  // addToCart(product: any): void {
  //   this.storeService.addToCart(product);
  //   this.router.navigate(['list']);
  // }
  // addToCart(product: any): void {
  //   const storedCart = sessionStorage.getItem('cart');
  //   let cart = storedCart ? JSON.parse(storedCart) : [];
  
  //   const existingProduct = cart.find((item: { id: any; }) => item.id === product.id);
  
  //   if (existingProduct) {
  //     existingProduct.unidades++;
  //     existingProduct.totalPrice = existingProduct.precio * existingProduct.unidades;
  //   } else {
  //     product.unidades = 1;
  //     product.totalPrice = product.precio;
  //     cart.push(product);
  //   }
  
  //   sessionStorage.setItem('cart', JSON.stringify(cart));
    
  //   this.router.navigate(['list']);
  // }
  addToCart(product: any): void {
    this.storeService.addToCart(product);
  }
  

  navigateDetail(id:string){
    this.router.navigate(['detail',id]);
  }

  openConfirmCart(product:any){
    this.confirmCartService.openModal();
    this.confirmCartService.setProduct(product);
    this.router.navigate(['list']);
  }

  }
