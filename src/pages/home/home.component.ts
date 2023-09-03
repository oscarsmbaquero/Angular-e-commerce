import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  mostrarBoton = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.mostrarBoton = true;
    }, 4000); // El botón aparecerá después de 3 segundos (3000 milisegundos)
  }

  navigateList(): void{

    this.router.navigate(['list']);

  }

}
