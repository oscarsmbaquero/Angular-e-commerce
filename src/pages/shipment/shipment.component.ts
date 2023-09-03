import { Component, EventEmitter, Output } from '@angular/core';


interface Envio {
  label: string;
  text?: string;
  type: string;
  precio: number;
}

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})


export class ShipmentComponent {

  @Output() priceShipment = new EventEmitter<number>();

  envios: Envio[]= [
    {
      label: 'Entrega a domicilio (Urgente)',
      text: 'Recibe tu paquete al día siguiente en casa por 20€.',
      type: 'correosUrgente',
      precio: 20,
    },
    {
      label: 'Recogida en agencia de transporte (SEUR 08:30)',
      text: 'Retira tu paquete a partir de las 08:30 por 15€.',
      type: 'seur',
      precio: 15,
    },
    {
     
      label: 'Recogida en Correos (48h)',
      text: 'Recoge tu paquete 48 horas después de confirmar el envío por 10€.',
      type: 'correos',
      precio: 10,
    }
  ]
  precioEnvio(precio: number){
    this.priceShipment.emit(precio);
  }
}
