import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from 'src/core/services/store/store.service';
//import * as jsPDF from 'jspdf';
import { jsPDF } from 'jspdf';


@Component({
  selector: 'app-ver-gastos',
  templateUrl: './ver-gastos.component.html',
  styleUrls: ['./ver-gastos.component.css']
})
export class VerGastosComponent {

  // gastos: any;
  @Input() gastos: any | undefined;

  selectedItem: any = null;
  //selectedGasto: any;
  selectedGasto: any = null;
  selectedRowIndex: number | null = null;


  constructor(
    
    
    //private storeService : StoreService
  ){
    console.log(this.gastos,'vergastos');
  }

//   ngOnInit() {
//     this.storeService.getGastos().subscribe((data) => {
//         this.gastos = data;
//         console.log(this.gastos);
        
//     });
// }


toggleDetails(gasto: any, index: number): void {
  if (this.selectedGasto === gasto) {
    this.selectedGasto = null;
    this.selectedRowIndex = null;
  } else {
    this.selectedGasto = gasto;
    this.selectedRowIndex = index;
    //this.generarPdf(this.selectedGasto.image)
  }
  //console.log(this.selectedGasto.image,45);
  
}
generarPdf(image: any): void{
  // console.log(image);
  const nombreArchivo = 'factura.pdf';

    const pdf = new jsPDF();
    pdf.addImage(image, 'JPEG', 10, 10, 190, 150);
    pdf.save(nombreArchivo);
    //console.log(pdf,'pdf');
    
  

}


}
