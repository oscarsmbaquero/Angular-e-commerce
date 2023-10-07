import { StoreService } from 'src/core/services/store/store.service';
import { Component } from '@angular/core';
import { IVenta } from 'src/core/services/models/ventas.models';


@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.css']
})
export class ShipmentsComponent {

  orders!: IVenta[];
 /**
  * check
  */
  checked: boolean = false;

  constructor(
    private storeService: StoreService
  ){}

  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
    this.storeService.getOrders().subscribe((orders) => {
      this.orders = orders;
      this.orders.forEach((order:any) =>{
        if(order.updatedAt){
          order.statusSend = 'Atrasado'
        }
        order.isChecked = false;
      })
      console.log(this.orders);
  });
}
/**
 * cambair estado del pedido
 */
changeState(id: string){
  
  const orderSelected = this.orders.find((order)=> order._id === id);
  // if( orderSelected && orderSelected.isChecked){
  //   setTimeout(() => {
  //     orderSelected.isChecked = !orderSelected.isChecked  
  //   }, 500);
    
  // }
  
  if(orderSelected?.estadoPedido === 'Entregado'){
    orderSelected.estadoPedido = 'Cerrado';
  }
  if(orderSelected?.estadoPedido === 'Enviado'){
    orderSelected.estadoPedido = 'Entregado';
  }

  if(orderSelected?.estadoPedido === 'Preparando pedido'){
    orderSelected.estadoPedido = 'Enviado';
  }
 
  console.log(orderSelected?.estadoPedido);
  if(orderSelected){
    this.storeService.changeStateOrders(id, orderSelected.estadoPedido).subscribe((element)=>{

    }); 
  }
  
}



}
