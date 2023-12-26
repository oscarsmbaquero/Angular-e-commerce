import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from 'src/core/services/store/store.service';
//import * as jsPDF from 'jspdf';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-ver-gastos',
  templateUrl: './ver-gastos.component.html',
  styleUrls: ['./ver-gastos.component.css'],
})
export class VerGastosComponent {
  // gastos: any;
  @Input() gastos: any | undefined;

  //selectedItem: any = null;
  selectedGasto: any;
  //selectedGasto: any = null;
  selectedRowIndex: number | null = null;

  constructor() {}

  /**
   * Metodo para ver detalles de el gasto
   * @param gasto
   * @param index
   */
  toggleDetails(gasto: any, index: number): void {
    if (this.selectedGasto === gasto) {
      this.selectedGasto = null;
      this.selectedRowIndex = null;
    } else {
      this.selectedGasto = gasto;
      this.selectedRowIndex = index;
    }
  }
  /**
   * Metodo para convertir el png a pdf y descargarlo
   * @param image 
   * @param concepto 
   */
  generarPdf(image: any, concepto: string): void {
    const nombreArchivo = `factura-${concepto}.pdf`;

    const pdf = new jsPDF();
    pdf.addImage(image, 'JPEG', 10, 10, 190, 150);
    pdf.save(nombreArchivo);
  }
}
