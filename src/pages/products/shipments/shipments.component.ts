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
      })
      console.log(this.orders);
  });
}

}
