import { Component, EventEmitter, Output, Input } from '@angular/core';


interface Envio {
  label: string;
  text?: string;
  type: string;
  precio: number;
  cssClass: string;
}

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})


export class ShipmentComponent {

  @Input() total: number | undefined;

  @Output() priceShipment = new EventEmitter<number>();

  ngOnInit(){
    console.log(this.total);
  }


  envios: Envio[] = [
    {
      label: 'Entrega a domicilio (Urgente)',
      text: 'Recibe tu paquete al día siguiente en casa por 20€.',
      type: 'correosUrgente',
      precio: 20,
      cssClass: 'red' // Agrega la clase CSS que deseas aplicar aquí
    },
    {
      label: 'Recogida en agencia de transporte (SEUR 08:30)',
      text: 'Retira tu paquete a partir de las 08:30 por 15€.',
      type: 'seur',
      precio: 15,
      cssClass: 'blue' // Agrega la clase CSS que deseas aplicar aquí
    },
    {
      label: 'Recogida en Correos (48h)',
      text: 'Recoge tu paquete 48 horas después de confirmar el envío por 10€.',
      type: 'correos',
      precio: 10,
      cssClass: 'green' // Agrega la clase CSS que deseas aplicar aquí
    }
  ];
  
  precioEnvio(precio: number){
    this.priceShipment.emit(precio);
  }
}
