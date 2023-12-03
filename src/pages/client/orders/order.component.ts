import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/core/services/models/product.models';
import { IUser } from 'src/core/services/models/user-models';
//servisios
import { UsersService } from 'src/core/services/users/users.service';
import { StoreService } from 'src/core/services/store/store.service';
//pipe fecha
//import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  user :any;

  pedidos:any =[];

  public ultimoPedido = false;

  constructor(
    private usersService : UsersService,
    private storeService: StoreService,
    private router: Router
  ){

  }

  ngOnInit() {
    console.log('Order');
    
    const userJSON = localStorage.getItem('user');
    
    
    if (userJSON) {
      const userObject = JSON.parse(userJSON); // Parsea el JSON almacenado en 'user'
      const userId = userObject.data.id; // Accede al campo 'id' dentro del objeto 'data'
      console.log(userId); // Muestra el 'id' en la consola
      this.myOrders(userId);
      
    } else {
      console.log('No se encontró ningún valor en localStorage para la clave "user".');
    }
  }

    /**
   * renderizar la venta al inicio y fijarlo en la parte superior de la pantalla
   */
    ngAfterViewInit() {
      window.scrollTo(0, 0);
    }
  

  // myOrders(userId: string){
  //   console.log('entro');
  //   this.usersService.getOrderClient(userId).subscribe((data) =>{
  //   console.log(data,'datas');
  //   const orderNumbers = data.pedidos.numeroPedido.map((element: any) => element.orderNumber);
  //   console.log(orderNumbers);
  //   })
  //   console.log(userId,'userId');
  

  // }
  myOrders(userId: string): void {
    this.usersService.getOrderClient(userId).subscribe((response) => {
      const data = response.data; // Accede al objeto "data"
      if (this.pedidos && data.length > 0) {
        this.ultimoPedido = true;
      }
      
        if (data && data.pedidos && data.pedidos.numeroPedido) {
          const allOrdersArray = data.pedidos.numeroPedido.map((pedido:any) => {
            const orderDetails = {
              orderNumber: pedido.orderNumber,
              fechaPedido: pedido.createdAt,
              userBuy: pedido.userBuy,
              estadoPedido: pedido.estadoPedido,
              salePrice: pedido.salePrice,
              products: pedido.products.map((producto:any) => ({
                productName: producto.name,
                productDescription: producto.description,
                unidades: producto.unidades,
                precio: producto.precio,
                // Agregar más campos de producto si es necesario.
              })),
              // Agregar más campos de pedido si es necesario.
            };
            return orderDetails;
          });
    
          // Ahora, tienes un solo array que contiene todos los detalles de cada pedido.
          console.log(this.pedidos);
          this.pedidos = allOrdersArray;
          console.log(this.pedidos,'pedidos final');
        } else {
          console.error('No se encontraron datos válidos en la respuesta.');
        }
    
     
    });
  
    console.log(userId, 'userId');
  }
  
  buyAgain(product:IProduct){
    console.log(product);
    this.storeService.addToCart(product);
    this.router.navigate(['/cesta']);
  }
  
  


}
