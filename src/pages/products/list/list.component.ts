import { StoreService } from './../../../core/services/store/store.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/core/services/models/product.models';
//servicio  modal
import { ConfirmCartService } from 'src/core/services/confirmCart/confirm-cart.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [MessageService],
})
export class ListComponent {
  activeUser: any;

  products: IProduct[] = [];

  messageLogin = true;

  stockStatus: string[] = [];

  constructor(
    private storeService: StoreService,
    private router: Router,
    private confirmCartService: ConfirmCartService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.activeUser = localStorage.getItem('user');
    console.log(this.activeUser);
    this.getProducts();
  }

  private getProducts() {
    this.storeService.getProducts().subscribe((products) => {
      this.products = products;
      this.products.forEach((product) => {
        if (product.unidades < 1) {
          product.stock = 'Agotado';
          product.stockStatus = 'danger';
        } else if (product.unidades <= 50) {
          product.stock = 'Pocas unidades';
          product.stockStatus = 'warning';
        } else {
          product.stock = 'En stock';
          product.stockStatus = 'success'
        }
      });
      
      this.stockStatus = this.products.map(product => product.stock!) as string[];// Puedes acceder a this.products con el campo 'stock' añadido
      console.log(this.products);
    });
  }

  confirmAndAddtoCart(product: any) {
    if (this.activeUser) {
      console.log('Si lo hay');
      this.addToCart(product);
      this.show();
    } else {
      sessionStorage.setItem('messageLogin', JSON.stringify(this.messageLogin));
      this.router.navigate(['user']);
    }

    //this.openConfirmCart(product);
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

  navigateDetail(id: string) {
    this.router.navigate(['detail', id]);
  }

  openConfirmCart(product: any) {
    this.confirmCartService.openModal();
    this.confirmCartService.setProduct(product);
    this.router.navigate(['list']);
  }

  show() {
    console.log('Entro');
    this.messageService.add({
      severity: 'success',
      summary: '',
      detail: 'Producto añadido correctamente',
    });
  }

}
