import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public text: string = 'Disfruta de una buena conexión con estas gafas de sol que incorporan bluetooth 5.0 compatible con dispositivos Android e iOS. Cuenta con un alcance de hasta 10 metros para mayor comodidad. Además, incorpora cancelación de ruido para un sonido nítido, ideal para responder llamadas y disfrutar de tu música favorita. La batería se carga mediante USB en un máximo de dos a tres horas.';
  public send: string='Envio en 24h'
  public scrollSpeed: number = 10; // Velocidad de desplazamiento

  constructor() { }

  ngOnInit() {
    this.startScrolling();
  }

  startScrolling() {
    const container = document.getElementById('textBannerContainer');
    const banner = document.getElementById('textBanner');

    if (container && banner) {
      let position = container.offsetWidth;

      const moveBanner = () => {
        position--;
        if (position < -banner.offsetWidth) {
          position = container.offsetWidth;
        }
        banner.style.left = position + 'px';
        requestAnimationFrame(moveBanner);
      };

      moveBanner();
    }
  }

}
