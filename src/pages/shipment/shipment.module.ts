import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentComponent } from './shipment.component';



@NgModule({
  declarations: [
    ShipmentComponent
  ],
  imports: [
    CommonModule
  ],exports:[
    ShipmentComponent
  ]
})
export class ShipmentModule { }
