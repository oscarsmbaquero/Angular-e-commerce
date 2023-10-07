import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/core/services/store/store.service';
import { IProduct } from 'src/core/services/models/product.models';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../enviroment/environment'; // Ajusta la ruta según tu estructura de carpetas



declare var paypal: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'] ,
  providers: [MessageService],
})
export class CartComponent  implements OnInit{

  public payPalConfig?: IPayPalConfig;
  /**
   * almacenar la cesta
   */
  carts: IProduct[]=[];

  //hostia: number =0;


  unidades: number = 0;
  units: number = 1; // Inicialmente, las unidades serán 1
  articlesBuy: IProduct[] = [];

  total: number = 0; // Inicializamos el total en 0
  showSuccess: boolean | undefined;
  showPaypal: boolean = false;
  showShipment: boolean = false;
  priceShipme: number = 0;
  /**
   * flag para pintar el modal
   */
  visible: boolean = false;

  /**
   * almacenar el numero de pedido recibido 
   */
  numberOrder = '';

  constructor(
    private storeService: StoreService,
    private router: Router,
    private httpClient: HttpClient,
    private messageService: MessageService
  ){
    // this.carts = this.storeService.getCart();
    //this.calculateTotal(); // Calculamos el total al inicializar el componente
  }

  ngOnInit(){
    this.carts = this.storeService.getCart();
    this.carts.map((element)=>{
      this.unidades = element.unidades;
      console.log(element.unidades);

    });
     // Inicializamos totalPrice para todos los artículos en la cesta
     this.carts.forEach(car => {
      car.totalPrice = car.precio * this.units;
    });
    this.calculateTotal(); // Calculamos el total al inicializar el componente
    //this.initConfig();
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
      this.deleteId(car._id);
    }
  }

  calculateTotal(precioEnvio?: number): void {
    this.total = this.carts.reduce((accumulator, car) => accumulator + (car.totalPrice || 0), 0) + (precioEnvio || 0);
   
    
  }

  navigateList(){
    console.log('Entro');
    this.router.navigate(['list']);
  }

  /**
   * configuracion de paypal
   */
  // private initConfig(): void {
  //   const storeItems = JSON.parse(sessionStorage.getItem('cart') || '');
  //  console.log(storeItems,'storeItems');
  //   const purchaseUnits = storeItems.map((item: any) => ({
  //     items: [{
  //       name: item.name,
  //       quantity: item.unidades.toString(), //de unidades del artículo
  //       category: 'QUADLOCK', // Puedes cambiar la categoría según tus necesidades
  //       unit_amount: {
  //         currency_code: 'EUR',
  //         value: item.precio,
  //       }
  //     }],
  //     amount: {
  //       currency_code: 'EUR',
  //       value: (parseFloat(item.precio) * parseInt(item.unidades)).toFixed(2),
  //       breakdown: {
  //         item_total: {
  //           currency_code: 'EUR',
  //           value: (parseFloat(item.precio) * parseInt(item.unidades)).toFixed(2),
  //         }
  //       }
  //     }
  //   }));
  
  //   this.payPalConfig = {
  //     currency: 'EUR',
  //     clientId: environment.paypalClientId,
  //     createOrderOnClient: (data) => <ICreateOrderRequest>{
  //       intent: 'CAPTURE',
  //       purchase_units: purchaseUnits,
  //     },
  //     advanced: {
  //       commit: 'true'
  //     },
  //     style: {
  //       label: 'paypal',
  //       layout: 'vertical'
  //     },
  //     onApprove: (data, actions) => {
  //       console.log('onApprove - transaction was approved, but not authorized', data, actions);
  //       actions.order.get().then((details: any) => {
  //         console.log('onApprove - you can get full order details inside onApprove: ', details);
  //       });
  //     },
  //     onClientAuthorization: (data) => {
  //       console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
  //       this.showSuccess = true;
  //     },
  //     onCancel: (data, actions) => {
  //       console.log('OnCancel', data, actions);
  //     },
  //     onError: err => {
  //       console.log('OnError', err);
  //     },
  //     onClick: (data, actions) => {
  //       console.log('onClick', data, actions);
  //     },
  //   }
  // }


  shipment(){
    this.showShipment = !this.showShipment;
    this.showPaypal = false;
  }

  priceShipment(precio: number){
    this.showPaypal = true;
    this.priceShipme = precio;
    console.log(this.priceShipme);
    this.calculateTotal(this.priceShipme);
  }


  /**
   * Metodo para pintar solo dos decimales
   * @param price 
   * @returns 
   */
  getFixed(price: number){
     return price.toFixed(2);
  }

  buyProducts(){
    this.articlesBuy = JSON.parse(sessionStorage.getItem('cart') || '');
    console.log(this.articlesBuy,'articlesBuy');
    this.storeService.buyProducts(this.articlesBuy).subscribe((response: any)=>{
      if (response.status === 201) {

        setTimeout(() => {
          this.delete();  
        }, 5000);
        
        //localStorage.removeItem('user');
        this.numberOrder = response.data.orderNumber
        this.visible = true;
      } else {
        console.error('La solicitud no fue exitosa (estado ' + response.status + ')');
        
      }
    },
    (error) => {
      console.error('Error al enviar los datos:', error);
    }
  );
     
    }

   
    
  
  }





