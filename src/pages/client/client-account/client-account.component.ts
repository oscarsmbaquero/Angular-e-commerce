import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-account',
  templateUrl: './client-account.component.html',
  styleUrls: ['./client-account.component.css']
})
export class ClientAccountComponent {

  constructor(
    private router: Router
  ){

  }

  orders(){
    console.log('Entro');
    this.router.navigate(['client/orders']);
  }

}
