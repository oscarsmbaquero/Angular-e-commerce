import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/core/services/models/product.models';
import { StoreService } from 'src/core/services/store/store.service';
import { UsersService } from 'src/core/services/users/users.service';
import { logoService } from 'src/core/services/logo/logo.service';
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
  logoUrl: string = '';
  // logos: string[] = [
  //   //  'assets/images/logo.png',
  //   'assets/images/logo1.png',
  //   'assets/images/logo2.png',
  //   'assets/images/logo4.png',
  //   'assets/images/logo6.png',
  //   'assets/images/logo7.png',
  //   'assets/images/logo8.png',
  //   //  'assets/images/logo5.jpeg',
  //   //  'assets/images/logo6.jpeg',
  //   //  'assets/images/logo7.jpeg',
  //   //  'assets/images/logo8.jpeg',
  //   //  'assets/images/logo9.jpeg',
  // ];
  formGroup: FormGroup | undefined;

  carts: number = 0;
  activeUser: any;
  activeUserName: any;
  totalUnidades: number = 0;

  constructor(
    private router: Router,
    private storeService: StoreService,
    private usersService: UsersService,
    private logoService: logoService,
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
      console.log(this.activeUser);
      if (this.activeUser) {
        this.activeUserName = this.activeUser.data.user;
        console.log(this.activeUserName);
      }
    });
    //this.logoService.changeLogo();
    // this.logoUrl = this.logoService.getLogoUrl();
    // console.log(this.logoUrl); // Accede a la URL actual del logo
   
    // setInterval(() => this.logoService.changeLogo(), 5000);
    this.logoService.logoUrl$.subscribe(newLogoUrl => {
      this.logoUrl = newLogoUrl;
    });

    // this.changeLogo();
    // setInterval(() => this.changeLogo(), 5000);

    // this.formGroup = new FormGroup({
    //   selectedCity: new FormControl<City | null>(null),
    // });
  }
  logout(): void {
    this.usersService.clearCurrentUser();
    this.router.navigate(['/']);
  }

  // changeLogo() {
  //   console.log('Entro');
  //   const randomIndex = Math.floor(Math.random() * this.logos.length);
  //   this.logoUrl = this.logos[randomIndex];
  // }
}
