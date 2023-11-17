
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/core/services/store/store.service';
import { UsersService } from 'src/core/services/users/users.service';
import { IProduct } from 'src/core/services/models/product.models';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../enviroment/environment'; // Ajusta la ruta según tu estructura de carpetas
import emailjs from '@emailjs/browser';
import { IVenta } from 'src/core/services/models/ventas.models';



declare var paypal: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'] ,
  providers: [MessageService],
})
export class CartComponent  implements OnInit, AfterViewInit, OnChanges{

  public payPalConfig?: IPayPalConfig;
  /**
   * almacenar la cesta
   */
  carts: IProduct[]=[];

  activeUser: any;
  activeUserId: any;

  buttonEditProfile = false;
  //hostia: number =0;


  unidades: number = 0;
  units: number = 1; // Inicialmente, las unidades serán 1
  articlesBuy: IProduct[] = [];

  products: IProduct[] = [];
  /**
   * total del importe 
   */
  total: number = 0; // Inicializamos el total en 0

  /**
   * valor total con envio
   */
  totalWithSend: number = 0;


  showSuccess: boolean | undefined;
  showPaypal: boolean = false;
  showShipment: boolean = false;
  priceShipme: number = 0;
  /**
   * flag para pintar el modal
   */
  visible: boolean = false;
  /**
   * flag para guardar el mensaje del boton. //TODO
   */
  messageButton = '';

  /**
   * almacenar el numero de pedido recibido 
   */
  numberOrder = '';

  constructor(
    private storeService: StoreService,
    private router: Router,
    private httpClient: HttpClient,
    private messageService: MessageService,
    private usersService:UsersService
  ){
    // this.carts = this.storeService.getCart();
    //this.calculateTotal(); // Calculamos el total al inicializar el componente
  }
ngOnInit(){
  //RECUPERAMOS EL USER LOGEADO PARA COMPROBAR SI TIENE LOS DATOS NECESARIOS PARA HACER LA COMPRA
    this.usersService.getCurrentUser().subscribe((user) => {      
      this.activeUser = user;
      console.log(this.activeUser);
      if(this.activeUser){
        this.activeUserId = this.activeUser.data.id;
        console.log(this.activeUserId);
        this.verifyUSerOk(this.activeUserId);
      }
      
    });
    //RECUPERAMOS LOS ARTICULOS DE LA CESTA DEL LOCALSTORAGE
    this.carts = this.storeService.getCart();
    console.log(this.carts,'carts');
    this.carts.map((element)=>{
      this.unidades = element.unidadesCompra;
      console.log(element.unidades);
    });
      // Inicializamos totalPrice para todos los artículos en la cesta
     this.carts.forEach(car => {
      car.totalPrice = car.precio * car.unidadesCompra;
    });
    this.calculateTotal(); // Calculamos el total al inicializar el componente
    //RECUPERO LOS PRODUCTOS
    this.storeService.getProducts().subscribe((products) => {
      this.products = products;
      console.log(this.products,72);
    });

  }
  /**
   * borrar del sessionStorage la cesta
   */
  delete(){
    this.storeService.clearCart();
    window.location.reload(); 
  }
 /**
  * borrar un articulo de la cesta
  * @param cart 
  */
  deleteId(cart:string){
    this.storeService.clearCartId(cart);
    window.location.reload(); 
  }

  // Función para incrementar las unidades y actualizar el precio total
  incrementUnits(car: IProduct, index: number) {
    const productInCart = this.products.find(product => product._id === car._id);
    if (productInCart) {
      // Comprobar si hay suficientes unidades disponibles
      if (productInCart.unidades > car.unidadesCompra) {
        // Incrementar las unidades en el carrito y actualizar el precio
        this.carts[index].unidadesCompra++;
        this.carts[index].totalPrice = car.precio * car.unidadesCompra;
        this.calculateTotal(); // Si es necesario calcular el total general
        this.storeService.updateCart(this.carts);
      } else {
        this.showNotSelected();
      }
    } else {
      console.log('Producto no encontrado en this.products');
    }
  }
  
  decrementUnits(car: IProduct, index: number) {
    if (car.unidadesCompra > 1) {
      this.carts[index].unidadesCompra--;
      this.carts[index].totalPrice = car.precio * car.unidadesCompra;
      this.calculateTotal(); // Si es necesario calcular el total general
      this.storeService.updateCart(this.carts);
    } else if (car.unidadesCompra === 1) {
      this.deleteId(car._id);
    }

  }

  calculateTotal(precioEnvio?: number): void {
    //this.totalWithSend = this.carts.reduce((accumulator, car) => accumulator + (car.totalPrice || 0), 0) + (precioEnvio || 0);
    this.total = this.carts.reduce((accumulator, car) => accumulator + (car.totalPrice || 0), 0);
    if(precioEnvio){
      this.totalWithSend = this.total  + precioEnvio
    }else{
      this.totalWithSend = this.total
    }
    
    // const totalPriceProducts = this.carts.map((element) => element.totalPrice);
   // console.log(totalPriceProducts,'price');
    console.log(this.total,'price',this.totalWithSend,'send');
    setTimeout(() => {
      if (this.total >= 50){
        this.showSendFree('free');
        this.showPaypal = true;
      }else{
        this.showSendFree('pay');
      }
    }, 1500);
    
   //this.shipment(); 
    
  }
  /**
   * redireccionar al listado
   */
  navigateList(){
    this.router.navigate(['list']);
  }
  /**
   * mensaje si selecionamos mas unidades de las q hay en stock
   */
  showNotSelected() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: `No hay mas unidades en stock`,
    });
  }
  showNotAdress() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: `Tienes datos incompletos necesarios para el envio`,
    });
  }
  /**
   * Mensaje de envio pagado o gratis
   * @param option 
   */
  showSendFree(option: string) {
    switch (option) {
      case 'free':
        this.messageService.add({
          severity: 'info',
          summary: 'Success',
          detail: `Envio Grátis`,
        });
        this.showShipment = false;
        break;
        case 'pay':
          this.messageService.add({
            severity: 'warn',
            summary: 'Warn',
            detail: `Si añades mas productos y superas los 50 €, tienes envío gratis`,
          });
          this.showShipment = true;
        break;
      default:
        break;
    }
  }

  /**
   * renderizar la venta al inicio y fijarlo en la parte superior de la pantalla
   */
  ngAfterViewInit() {
    window.scrollTo(0, 0);
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
    if(this.total >=50)  {
      this.messageButton = 'Envio gratis';
      this.showSendFree('free');
      // this.showShipment = false;
      // this.showPaypal = true;
    }else{
      //this.showShipment = !this.showShipment;
      this.messageButton = 'Calcular Envío';
      this.showShipment = true;
    }
    // this.showShipment = !this.showShipment;
    // this.showPaypal = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    // Verificar si 'total' ha cambiado
    if (['changes.total']) {
      this.shipment();
    }
  }

  priceShipment(precio: number){
    this.showPaypal = true;
    this.priceShipme = precio;
    console.log(this.priceShipme,303);
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

    const saleTotal = this.total + this.priceShipme
  console.log(saleTotal,'total');
  const venta: IVenta = {
    //_id: 'ID_de_la_venta',
    orderNumber: '',
    userBuy: '',
    products: this.articlesBuy,
    estadoPedido: 'Preparando Pedido',
    //isChecked: false,
    salePrice: saleTotal,
  };
    this.storeService.buyProducts(venta).subscribe((response: any)=>{
      if (response.status === 201) {
        console.log(response);
        const usermail  = response.data.user.mail;
        const username = response.data.user.name;
        const orderNumber = response.data.orderNumber;
        console.log(usermail,'usermail');
        this.sendMail(usermail, username, orderNumber);
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

    sendMail(mail: string, name: string, orderNumber: string){
      const message =`Pedido realizado correctamente. En tu perfil podrás ver el estado actual de tu pedido. ${orderNumber}`
      emailjs.init('dso8n6rVU1ADlfbV4')
      let response  =  emailjs.send("service_esqoixc","template_pj9nror",{
        from_name: 'Nombre de la empresa',
        to_name: name,
        message: message,
        reply_to: mail,
        orderNumber: orderNumber,
        });
    }

    verifyUSerOk(id: string): void {
      this.usersService.getUSerById(id).subscribe(
        (userData: any) => {
          console.log(userData);    
          // Verificar si la propiedad 'address' está presente en los datos del usuario
          if (userData?.data?.pedidos?.address || 
              userData?.data?.pedidos?.cp ||
              userData?.data?.pedidos?.province

            
            ) {
            console.log('La propiedad address está presente:', userData.data.pedidos.address);
            // Aquí puedes realizar la acción que desees cuando la propiedad 'address' está presente
          } else {
            this.showNotAdress();
            this.buttonEditProfile = true;
            console.log(this.buttonEditProfile);
            
            console.error('La propiedad address no está presente en los datos del usuario');
            // Aquí puedes mostrar un mensaje de error o realizar otra acción según tus necesidades
          }
        },
        (error) => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
    
      console.log(id, 395);
    }

    editProfile(){
      this.router.navigate(['client/profile'])
    }

  }





