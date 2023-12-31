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

  unidadesCompra = 0 ;

  selectedOptions: { [productId: number]: number } = {};

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

  // private getProducts() {
  //   this.storeService.getProducts().subscribe((products) => {
  //     this.products = products;
  //     this.products.forEach((product) => {
  //       if (product.unidades < 1) {
  //         product.stock = 'Agotado';
  //         product.stockStatus = 'danger';
  //       } else if (product.unidades <= 50) {
  //         product.stock = 'Stock';
  //         product.stockStatus = 'warning';
  //       } else {
  //         product.stock = 'Stock';
  //         product.stockStatus = 'success'
  //       }
  //     });
      
  //     this.stockStatus = this.products.map(product => product.stock!) ;
  //     console.log(this.products);
  //   });
  // }
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
          product.stockStatus = 'success';
        }
  
        // Agregar campo isNew y establecerlo en true si la fecha actual es inferior a 15 días
        if (product.createdAt) {
          const createdAtDate = new Date(product.createdAt).getTime(); // Obtener el valor numérico de la fecha
          const currentDate = new Date().getTime(); // Obtener el valor numérico de la fecha actual
          const differenceInDays = Math.floor((currentDate - createdAtDate) / (1000 * 60 * 60 * 24));
  
          if (differenceInDays < 15) {
            product.isNew = true;
          } else {
            product.isNew = false;
          }
        }
      });
  
      this.stockStatus = this.products.map((product) => product.stock!);
      console.log(this.products);
    });
  }
  
  

  confirmAndAddtoCart(product: any) {
    console.log(product);
    if (this.activeUser) {
      console.log('Si lo hay');
      if(!product.unidadesCompra){
        console.log('no hay unidades')
        this.showNotSelected();
      }else{
        console.log('Si hay unidades ')
        this.addToCart(product);
        this.show();
      }
      
    } else {
      localStorage.setItem('messageLogin', JSON.stringify(this.messageLogin));
      this.router.navigate(['user']);
    }

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

  showNoStock(unidades: number) {
    console.log('Entroasdasdasd');
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: `No hay stock. Máximo ${unidades} uds.`,
    });
  }
  showNotSelected() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: `Debe de seleccionar cantidad`,
    });
  }

  onSelectChange(product: IProduct, index: number) {
    const selectedOption = this.selectedOptions[product._id];
    console.log(selectedOption);
    console.log('Valor seleccionado: ' + selectedOption);
    
    const unidadesRestantes = product.unidades;

    if (selectedOption <= unidadesRestantes) {
      //const unidadesCompra = parseInt(this.selectedOption, 10);
      // Agregar el campo unidadesCompra al objeto product solo si hay suficiente stock
      product.unidadesCompra = selectedOption;
      console.log(this.products,115);
      console.log('Si hay Stock');
    } else {
      this.showNoStock(unidadesRestantes);
      console.log('No hay Stock');
    }
  }

  /**
   * método para pintar en el input Cantidad antes de seleccionar
   */
  // ngAfterViewInit() {
  //   // Establecer la opción "Cantidad" como seleccionada
  //   this.selectedOption = 'Cantidad';
  // }
}
