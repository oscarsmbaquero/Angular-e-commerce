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

  selectedOption: any;

  constructor(
    private storeService: StoreService,
    private router: Router,
    private confirmCartService: ConfirmCartService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.activeUser = localStorage.getItem('user');
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
          product.stock = 'Stock';
          product.stockStatus = 'warning';
        } else {
          product.stock = 'Stock';
          product.stockStatus = 'success'
        }
      });
      
      this.stockStatus = this.products.map(product => product.stock!) ;
      console.log(this.products);
    });
  }

  confirmAndAddtoCart(product: any) {
    console.log(product);
    // if (this.activeUser) {
    //   console.log('Si lo hay');
    //   this.addToCart(product);
    //   this.show();
    // } else {
    //   localStorage.setItem('messageLogin', JSON.stringify(this.messageLogin));
    //   this.router.navigate(['user']);
    // }

    //this.openConfirmCart(product);
  }
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
    console.log('Entroasdasdasd');
    this.messageService.add({
      severity: 'success',
      summary: '',
      detail: 'Producto añadido correctamente',
    });
  }

  onSelectChange() {
    console.log('Valor seleccionado: ' + this.selectedOption);
    // Aquí puedes realizar cualquier acción que desees con el valor seleccionado.
  }

  /**
   * método para pintar en el input Cantidad antes de seleccionar
   */
  ngAfterViewInit() {
    // Establecer la opción "Cantidad" como seleccionada
    this.selectedOption = 'Cantidad';
  }
}
