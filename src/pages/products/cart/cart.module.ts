import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { NgxPayPalModule } from 'ngx-paypal';
import { ShipmentModule } from 'src/pages/shipment/shipment.module';




@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    NgxPayPalModule,
    ShipmentModule
  ]
})
export class CartModule { }
