import { Component } from '@angular/core';
import { ConfirmCartService } from 'src/core/services/confirmCart/confirm-cart.service';

@Component({
  selector: 'app-confirm-cart',
  templateUrl: './confirm-cart.component.html',
  styleUrls: ['./confirm-cart.component.css']
})
export class ConfirmCartComponent {

  constructor(
    private confirmCartComponent: ConfirmCartService
  ){}


  closeModal(){
    this.confirmCartComponent.closeModal();
  }
}
