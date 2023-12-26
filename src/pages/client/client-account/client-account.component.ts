import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-account',
  templateUrl: './client-account.component.html',
  styleUrls: ['./client-account.component.css'],
})
export class ClientAccountComponent {
  constructor(private router: Router) {}
  /**
   * Metodo para navegar desde las dos cards
   * @param option
   */
  orders(option: string) {
    switch (option) {
      case 'first':
        this.router.navigate(['client/orders']);
        break;
      case 'second':
        this.router.navigate(['client/profile']);
        break;
      default:
        break;
    }
  }
}
