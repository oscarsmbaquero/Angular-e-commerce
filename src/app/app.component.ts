import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/core/services/store/store.service';
import { UsersService } from 'src/core/services/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'e-commerce';
  carts: number = 0;
  totalUnidades: number = 0;
  showCart = false; 
  activeUser: any;


  constructor(
    private storeService: StoreService,
    private router: Router,
    private usersService: UsersService
    ){

  }

  ngOnInit(){
    this.storeService.getCartObservable().subscribe((cartData) => {
      console.log(cartData);
      this.carts = cartData.length;
      this.totalUnidades = cartData.reduce(
        (total, producto) => total + producto.unidades,
        0
      );
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



}
