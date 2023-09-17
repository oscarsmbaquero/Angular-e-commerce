import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { NgxPayPalModule } from 'ngx-paypal';
import { ShipmentModule } from 'src/pages/shipment/shipment.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms'; // Importa FormsModule




@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    NgxPayPalModule,
    ShipmentModule,
    InputNumberModule,
    FormsModule
  ]
})
export class CartModule { }
