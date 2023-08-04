import { ConfirmCartComponent } from 'src/shared/confirm-cart/confirm-cart.component';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmCartService {

  product:any;
  constructor(
    private dialog: MatDialog
  ) { }

  openModal() {
    this.dialog.open(ConfirmCartComponent, {
      width: '500px',
      height: '500px',
      
    });
  }

  closeModal() {
    this.dialog.closeAll();
  }
  setProduct(product: any) {
    this.product = product;
    // console.log(this.product,'service')
  }

  getProduct(): any {
    return this.product;
  }
}
