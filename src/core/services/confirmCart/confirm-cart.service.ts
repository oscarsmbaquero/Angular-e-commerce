import { ConfirmCartComponent } from 'src/shared/confirm-cart/confirm-cart.component';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfirmCartService {

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
}
