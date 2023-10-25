import { Component, Input } from '@angular/core';
import { IProduct } from 'src/core/services/models/product.models';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css']
})
export class OrdersTableComponent {


  @Input() products!: IProduct[];
  
  

  ngOnInit(){
    console.log(this.products,'products');
  }

  // getSeverity(status: string) {
  //   switch (status) {
  //       case 'INSTOCK':
  //           return 'success';
  //       case 'LOWSTOCK':
  //           return 'warning';
  //       case 'OUTOFSTOCK':
  //           return 'danger';
  //   }
//}
}
