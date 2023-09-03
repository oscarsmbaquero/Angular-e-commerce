import { Component, EventEmitter, Output } from '@angular/core';


interface Envio {
  label: string;
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
      label: 'Urgente',
      type: 'urgente',
      precio: 20,
    },
    {
      label: 'Normal',
      type: 'normal',
      precio: 15,
    },
    {
      label: 'Ordinario',
      type: 'ordinario',
      precio: 10,
    }
  ]
  precioEnvio(precio: number){
    console.log(precio);
    this.priceShipment.emit(precio);

  }
}
