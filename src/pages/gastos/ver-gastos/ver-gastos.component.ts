import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/core/services/store/store.service';

@Component({
  selector: 'app-ver-gastos',
  templateUrl: './ver-gastos.component.html',
  styleUrls: ['./ver-gastos.component.css']
})
export class VerGastosComponent implements OnInit {

  gastos: any;

  selectedItem: any = null;
  //selectedGasto: any;
  selectedGasto: any = null;
  selectedRowIndex: number | null = null;


  constructor(
    private storeService : StoreService
  ){

  }

  ngOnInit() {
    this.storeService.getGastos().subscribe((data) => {
        this.gastos = data;
        console.log(this.gastos);
        
    });
}

// toggleDetails(item: any): void {
//   console.log('Entro',item);
  
//   if (this.selectedItem === item) {
//     this.selectedItem = null; // Oculta los detalles si se hace clic nuevamente en la misma fila
//     this.selectedGasto = false;
//   } else {
//     this.selectedItem = item; // Muestra detalles si se hace clic en una fila diferente
//     this.selectedGasto = true;
//   }
// }

toggleDetails(gasto: any, index: number): void {
  if (this.selectedGasto === gasto) {
    this.selectedGasto = null;
    this.selectedRowIndex = null;
  } else {
    this.selectedGasto = gasto;
    this.selectedRowIndex = index;
  }
}
}
