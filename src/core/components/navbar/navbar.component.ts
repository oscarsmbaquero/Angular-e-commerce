import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/core/services/models/product.models';
import { StoreService } from 'src/core/services/store/store.service';
import { FormControl, FormGroup } from '@angular/forms';

interface City {
  name: string;
  code: string;
}


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  formGroup: FormGroup | undefined;
  
  carts: number = 0;
  totalUnidades: number = 0;
  cities: City[] | undefined;

  constructor(
    private router: Router,
    private storeService: StoreService
  ){
    //this.carts = this.storeService.getCart().length;
    //console.log(this.carts,'navbar');
  }

  ngOnInit() {
    this.storeService.getCartObservable().subscribe((cartData) =>{

      console.log(cartData);
      this.carts = cartData.length;
      this.totalUnidades = cartData.reduce((total, producto) => total + producto.unidades, 0);
      });
      // this.storeService.totalProducts().subscribe(result => {
      //   this.totalUnidades = result;
      //   console.log(this.totalUnidades);
      // });
    // Obtener el número de carritos desde el storeService
    //this.carts = this.storeService.getCart().length;
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];

  this.formGroup = new FormGroup({
      selectedCity: new FormControl<City | null>(null)
  });
}
  }



