import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public text: string = 'Consulta nuestros productos!!!';
  public send: string='Envio en 24h'
  public scrollSpeed: number = 3; // Velocidad de desplazamiento (ajusta según tus preferencias)

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
