import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPlayComponent } from './card-play.component';
import { CardPlayRoutingModule } from './cart-play-routing.module';

//PrimeNg
import { GalleriaModule } from 'primeng/galleria';



@NgModule({
  declarations: [
    CardPlayComponent
  ],
  imports: [
    CommonModule,
    CardPlayRoutingModule,
    GalleriaModule
  ]
})
export class CardPlayModule { }
