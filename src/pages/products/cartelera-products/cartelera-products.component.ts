import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TypingEffectService } from 'src/core/services/typing-effect/typing-effect.service';

@Component({
  selector: 'app-cartelera-products',
  templateUrl: './cartelera-products.component.html',
  styleUrls: ['./cartelera-products.component.css']
})
export class CarteleraProductsComponent implements OnInit{

  mostrarIcono = false;

  constructor(
    private typingEffectService: TypingEffectService,
    private router: Router
  ){}

  startTyping(key: string, text: string) {
    this.typingEffectService.startTypingEffect(key, text);
  }

  ngOnInit() {
    this.startTyping('first', 'CarPlay/Android Auto');
    this.startTyping('second', 'Smart Glasses');
    this.startTyping('third', 'Adaptador inalámbrico CarPlay 2 en 1 y adaptador inalámbrico para automóvil Android Auto.');
    this.startTyping('four', 'Gafas inteligentes con Bluetooth 5.0, control de audio doble, carga rápida, protección UV.');

    setTimeout(() => {
      this.mostrarIcono = true;
    }, 2000);
  }
  getText(key: string) {
    return this.typingEffectService.getText$(key);
  }


  navigate(option: string){
    switch (option) {
      case 'first':
        this.router.navigate(['card-play']);
        break;
      case 'second':
        this.router.navigate(['list']);
        break;
      default:
        break;
    }
    

  }

}
