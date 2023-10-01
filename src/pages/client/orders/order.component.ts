import { Component } from '@angular/core';
import { IUser } from 'src/core/services/models/user-models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  user :any;

  ngOnInit() {
    console.log('Order');
    const userJSON = localStorage.getItem('user'); // Obtén el valor almacenado en 'user'
    
    if (userJSON) {
      const userObject = JSON.parse(userJSON); // Parsea el JSON almacenado en 'user'
      const userId = userObject.data.id; // Accede al campo 'id' dentro del objeto 'data'
      console.log(userId); // Muestra el 'id' en la consola
    } else {
      console.log('No se encontró ningún valor en localStorage para la clave "user".');
    }
  }
  

  myOrders(){
  

  }


}
