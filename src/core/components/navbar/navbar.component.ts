import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/core/services/models/product.models';
import { StoreService } from 'src/core/services/store/store.service';
import { UsersService } from 'src/core/services/users/users.service';
import { FormControl, FormGroup } from '@angular/forms';

// interface City {
//   name: string;
//   code: string;
// }

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  formGroup: FormGroup | undefined;

  carts: number = 0;
  activeUser: any;
  activeUserName: any;
  totalUnidades: number = 0;

  constructor(
    private router: Router,
    private storeService: StoreService,
    private usersService: UsersService
  ) {
    //this.carts = this.storeService.getCart().length;
    //console.log(this.carts,'navbar');
  }

  ngOnInit() {
    this.storeService.getCartObservable().subscribe((cartData) => {
      console.log(cartData);
      this.carts = cartData.length;
      this.totalUnidades = cartData.reduce(
        (total, producto) => total + producto.unidades,
        0
      );
    });
    this.usersService.getCurrentUser().subscribe((user) => {
      this.activeUser = user;
      this.activeUserName = user?.user;
    });   

    // this.formGroup = new FormGroup({
    //   selectedCity: new FormControl<City | null>(null),
    // });
  }
  logout(): void {
    this.usersService.clearCurrentUser();
    this.router.navigate(['/'])
 }
 
}
