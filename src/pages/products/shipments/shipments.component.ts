import { StoreService } from 'src/core/services/store/store.service';
import { Component } from '@angular/core';
import { IVenta } from 'src/core/services/models/ventas.models';

import { jsPDF } from 'jspdf';


@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.css']
})
export class ShipmentsComponent {

  orders!: IVenta[];
 /**
  * check
  */
  checked: boolean = false;

  constructor(
    private storeService: StoreService
  ){}

  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
    this.storeService.getOrders().subscribe((orders) => {
      this.orders = orders;
      
      this.orders.forEach((order:any) =>{
        if(order.updatedAt){
          order.statusSend = 'Atrasado'
        }
        order.isChecked = false;
      })
      console.log(this.orders);
  });
}
/**
 * cambair estado del pedido
 */
changeState(id: string){
  
  const orderSelected = this.orders.find((order)=> order._id === id);
  // if( orderSelected && orderSelected.isChecked){
  //   setTimeout(() => {
  //     orderSelected.isChecked = !orderSelected.isChecked  
  //   }, 500);
    
  // }
  
  if(orderSelected?.estadoPedido === 'Entregado'){
    orderSelected.estadoPedido = 'Cerrado';
  }
  if(orderSelected?.estadoPedido === 'Enviado'){
    orderSelected.estadoPedido = 'Entregado';
  }

  if(orderSelected?.estadoPedido === 'En proceso'){
    orderSelected.estadoPedido = 'Enviado';
  }
 
  console.log(orderSelected?.estadoPedido);
  if(orderSelected){
    this.storeService.changeStateOrders(id, orderSelected.estadoPedido).subscribe((element)=>{

    }); 
  }
  
}

printPdf(order: any){
  const nombreArchivo = `Pedido-${order.orderNumber}.pdf`;  
  // Añade una página al PDF
  const pdf = new jsPDF({
    unit: 'mm',
    format: [100, 150],
  });

  // Ajusta el tamaño de la fuente
  pdf.setFontSize(8);
  pdf.setLineHeightFactor(1.2);
  pdf.text(`Número de Orden: ${order.orderNumber}`, 20, 20);
  pdf.text(`Cliente: ${order.userBuy[0].user}`, 20, 30);
  pdf.text(`Dirección: ${order.userBuy[0].address}`, 20, 40);
  pdf.text(`C.P: ${order.userBuy[0].cp}`, 20, 50);
  pdf.text(`Provincia: ${order.userBuy[0].province}`, 20, 60);

  // Guarda el PDF
  pdf.save(nombreArchivo);
  
}
generarPdf(image: any, concepto: string): void {
  const nombreArchivo = `factura-${concepto}.pdf`;

  const pdf = new jsPDF();
  pdf.addImage(image, 'JPEG', 10, 10, 190, 150);
  pdf.save(nombreArchivo);
}




}
