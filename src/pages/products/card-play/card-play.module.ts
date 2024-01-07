import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPlayComponent } from './card-play.component';
import { CardPlayRoutingModule } from './cart-play-routing.module';

//PrimeNg
import { GalleriaModule } from 'primeng/galleria';
import { TabViewModule } from 'primeng/tabview';



@NgModule({
  declarations: [
    CardPlayComponent
  ],
  imports: [
    CommonModule,
    CardPlayRoutingModule,
    GalleriaModule,
    TabViewModule
  ]
})
export class CardPlayModule { }
