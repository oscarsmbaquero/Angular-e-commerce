import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmCartService } from 'src/core/services/confirmCart/confirm-cart.service';
import { PhotoService } from 'src/core/services/photoservice/photoservice';
import { StoreService } from 'src/core/services/store/store.service';

@Component({
  selector: 'app-card-play',
  templateUrl: './card-play.component.html',
  styleUrls: ['./card-play.component.css'],
  providers:[
    PhotoService,
  ]
})
export class CardPlayComponent implements OnInit {

  images: any[] | undefined;
  
  activeUser: any;

  activeIndex: number = 0;
 // responsiveOptions: any[] | undefined;

  // imagenes = [
  //   { source: 'https://img.freepik.com/foto-gratis/leon-melena-arcoiris-ojos-azules_1340-39421.jpg', thumbnail: 'URL_THUMBNAIL' },
  //   // Puedes agregar más imágenes según sea necesario
  // ];
  

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

responsiveOptions: any[] = [
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
constructor(
  private photoService: PhotoService,
  private confirmCartService: ConfirmCartService,
  private storeService: StoreService,
){

}


ngOnInit() {
  //recupero el usuario activo
    this.activeUser = localStorage.getItem('user');
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
addToCart(): void {
    const product ={
        
            "_id": "6516f079188964aaf379cf7d",
            "name": "OhO sunshine",
            "description": "OhO sunshine Water Resistance Audio Sunglasses,Open Ear Bluetooth Sunglasses to Listen Music and Make Phone Call",
            "unidades": 1,
            "precio": 49,
            "image": "https://res.cloudinary.com/dcfk8yjwr/image/upload/v1699178959/gafa1_otlsvr.jpg",
            "updatedAt": "2024-01-06T21:17:35.257Z",
            "unidadesVendidas": 7,
            "stock": "Stock",
            "stockStatus": "warning",
            "unidadesCompra": 1,
            "totalPrice": 49
          
    }
    this.storeService.addToCart(product);
  }

}
