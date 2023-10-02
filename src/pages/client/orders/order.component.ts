import { Component } from '@angular/core';
import { IUser } from 'src/core/services/models/user-models';
//servisios
import { UsersService } from 'src/core/services/users/users.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  user :any;

  constructor(
    private usersService : UsersService
  ){

  }

  ngOnInit() {
    console.log('Order');
    const userJSON = localStorage.getItem('user');   
    
    if (userJSON) {
      const userObject = JSON.parse(userJSON); // Parsea el JSON almacenado en 'user'
      const userId = userObject.data.id; // Accede al campo 'id' dentro del objeto 'data'
      console.log(userId); // Muestra el 'id' en la consola
      this.myOrders(userId)
    } else {
      console.log('No se encontró ningún valor en localStorage para la clave "user".');
    }
  }
  

  myOrders(userId: string){
    console.log('entro');
    this.usersService.getOrderClient(userId).subscribe((data) =>{
    console.log(data,'data');
    //const orderNumbers = data.pedidos.numeroPedido.map(element => element.orderNumber)
    })
    console.log(userId,'userId');
  

  }


}
