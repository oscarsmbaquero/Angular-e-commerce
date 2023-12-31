import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/core/services/store/store.service';
import { UsersService } from 'src/core/services/users/users.service';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'e-commerce';
  carts: number = 0;
  totalUnidades = 0;
  showCart = false; 
  activeUser: any;

  scrollPosition = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollPosition = window.scrollY || document.documentElement.scrollTop;
  }

  constructor(
    private storeService: StoreService,
    private router: Router,
    private usersService: UsersService,
    private sanitizer: DomSanitizer
    ){

  }

  ngOnInit(){
    this.storeService.getCartObservable().subscribe((cartData) => {
      console.log(cartData);
      this.carts = cartData.length;
      this.totalUnidades = cartData.reduce((total, producto) => total + parseInt(producto.unidadesCompra,10), 0);
      if(this.totalUnidades){
        this.showCart = true;
      }
    });

    this.usersService.getCurrentUser().subscribe((user) => {
      this.activeUser = user;
    });
  }

  redirigirACesta() {
    this.router.navigate(['/cesta']); // Asegúrate de que '/cesta' coincida con la ruta configurada en tu enrutamiento
  }
  redirigirWhatsapp() {
    const telefono = '+34608722702'; // Reemplaza esto con el número de teléfono deseado
    const url = `https://wa.me/${telefono}`;

    // Abre la URL de WhatsApp en la misma ventana o pestaña
    window.location.href = url;
  }

  scrollToTop() {
    // Usa JavaScript puro para hacer scroll suavemente hacia arriba
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }



}
