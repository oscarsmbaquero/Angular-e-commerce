import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';

import { LoadingComponent } from './components/loading/loading.component';
import { ConfirmCartComponent } from './confirm-cart/confirm-cart.component';

@NgModule({
  declarations: [
    LoadingComponent,
    ConfirmCartComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports :[
    LoadingComponent,
    ConfirmCartComponent
  ],
})
export class SharedModule { }
