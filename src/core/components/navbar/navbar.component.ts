import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/core/services/models/product.models';
import { StoreService } from 'src/core/services/store/store.service';
import { UsersService } from 'src/core/services/users/users.service';
import { logoService } from 'src/core/services/logo/logo.service';
import { FormControl, FormGroup } from '@angular/forms';
import { NavbarService } from 'src/core/services/navbarService/navbar.service';


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
  formGroup: FormGroup | undefined;

  carts: number = 0;
  activeUser: any;
  activeUserName: any;
  totalUnidades: number = 0;

  palabrasAvatar='';

  showNavbar = false;

  constructor(
    private router: Router,
    private storeService: StoreService,
    private usersService: UsersService,
    private logoService: logoService,
    private navbarService: NavbarService
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
        this.lettersAvatar(this.activeUserName)
        console.log(this.activeUserName);
      }
    });
    this.logoService.logoUrl$.subscribe(newLogoUrl => {
      this.logoUrl = newLogoUrl;
    });
  }
  logout(): void {
    this.navbarService.collapseNavbar();
    this.usersService.clearCurrentUser();
    this.router.navigate(['/']);
  }

   lettersAvatar(cadena: string, cantidadLetras = 1) {
    // Dividir la cadena en palabras
    const palabras = cadena.split(' ');
  
    // Iterar sobre cada palabra y extraer las letras especificadas
    const letrasExtraidas = palabras.map((palabra) => {
      return palabra.slice(0, cantidadLetras);
    });
  
    // Unir las letras extraídas en una nueva cadena
    const resultado = letrasExtraidas.join(' ');
  
    this.palabrasAvatar= resultado;
  }

  navigateTo(){
    this.router.navigate(['/client/account'])
  }

  /**
   * collapsa el navbar desde el submenu
   */
  toggleNavbar(){
  //   const navbarToggler = document.querySelector('.navbar-toggler') as HTMLElement;
  // if (navbarToggler) {
  //   navbarToggler.click();
  // }
  this.navbarService.collapseNavbar();
  }
}
