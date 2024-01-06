import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarteleraProductsComponent } from './cartelera-products.component';
import { CarteleraRoutingModule } from './cartelera-routing.module';



@NgModule({
  declarations: [
    CarteleraProductsComponent
  ],
  imports: [
    CommonModule,
    CarteleraRoutingModule
  ]
})
export class CarteleraProductsModule { }
