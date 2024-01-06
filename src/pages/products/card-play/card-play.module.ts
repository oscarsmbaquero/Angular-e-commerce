import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPlayComponent } from './card-play.component';
import { CardPlayRoutingModule } from './cart-play-routing.module';



@NgModule({
  declarations: [
    CardPlayComponent
  ],
  imports: [
    CommonModule,
    CardPlayRoutingModule
  ]
})
export class CardPlayModule { }
