import { Component } from '@angular/core';
import { IProduct } from 'src/core/services/models/product.models';

import { StoreService } from 'src/core/services/store/store.service';




@Component({
  selector: 'app-inventary',
  templateUrl: './inventary.component.html',
  styleUrls: ['./inventary.component.css']
})
export class InventaryComponent {
  products!: IProduct[];
  /**
   * flag para pintar el boton de aceptar
   */
  accepted= false;

  stockStatus: string[] = [];


constructor(
  private storeService: StoreService
){}


ngOnInit() {
  this.getProducts();
}

private getProducts() {
    this.storeService.getProducts().subscribe((products) => {
      this.products = products;
      this.products.forEach((product) => {
        if (product.unidades < 1) {
          product.stock = 'Agotado';
          product.stockStatus = 'danger';
        } else if (product.unidades <= 25) {
          product.stock = 'PocoStock';
          product.stockStatus = 'warning';
        } else {
          product.stock = 'Stock';
          product.stockStatus = 'success'
        }
      });
      
      this.stockStatus = this.products.map(product => product.stock!) ;// Puedes acceder a this.products con el campo 'stock' añadido
      console.log(this.products);
    });
  }

  getSeverity(status: string) {
    switch (status) {
        case 'Stock':
            return 'success';
        case 'PocoStock':
            return 'warning';
        case 'Agotado':
            return 'danger';
        default :
        return 'unknown'; // Valor de retorno predeterminado para casos no coincidentes.    
    }
}

AddUnit(id: string, unidades: number, mode: string) {
  this.accepted = true;
  console.log(id, unidades, mode);

  switch (mode) {
    case 'decrement':
      // Busca el producto correspondiente por su 'id' en el array 'products'
      const productToDecrement = this.products.find(product => product._id === id);

      // Si se encontró el producto, decrementa sus unidades
      if (productToDecrement) {
        productToDecrement.unidades--;
      } else {
        console.log('Producto no encontrado con ID:', id);
      }
      break;

    case 'increment':
      // Busca el producto correspondiente por su 'id' en el array 'products'
      const productToIncrement = this.products.find(product => product._id === id);

      // Si se encontró el producto, incrementa sus unidades
      if (productToIncrement) {
        productToIncrement.unidades++;
      } else {
        console.log('Producto no encontrado con ID:', id);
      }
      break;

    default:
      console.log('Modo desconocido:', mode);
  }
}

validateUnits(){
  
}

}
