import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PhotoService } from 'src/core/services/photoservice/photoservice';

@Component({
  selector: 'app-card-play',
  templateUrl: './card-play.component.html',
  styleUrls: ['./card-play.component.css'],
  providers:[
    PhotoService
  ]
})
export class CardPlayComponent implements OnInit {

  images: any[] | undefined;

  responsiveOptions: any[] | undefined;

  // imagenes = [
  //   { source: 'https://img.freepik.com/foto-gratis/leon-melena-arcoiris-ojos-azules_1340-39421.jpg', thumbnail: 'URL_THUMBNAIL' },
  //   // Puedes agregar más imágenes según sea necesario
  // ];
  position: string = 'bottom';
  imagenActiva: number = 0; // Inicializa con el índice de la imagen activa

  //position: string = 'bottom';

  positionOptions = [
    {
        label: 'Bottom',
        value: 'bottom'
    },
    {
        label: 'Top',
        value: 'top'
    },
    {
        label: 'Left',
        value: 'left'
    },
    {
        label: 'Right',
        value: 'right'
    }
];

// responsiveOptions: any[] = [
//     {
//         breakpoint: '1024px',
//         numVisible: 5
//     },
//     {
//         breakpoint: '768px',
//         numVisible: 3
//     },
//     {
//         breakpoint: '560px',
//         numVisible: 1
//     }
// ];
constructor(
  private photoService: PhotoService
){

}


ngOnInit() {
  this.photoService.getImages().then((images) => (this.images = images));
  this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];
}

}
