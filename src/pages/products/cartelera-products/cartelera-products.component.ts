import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TypingEffectService } from 'src/core/services/typing-effect/typing-effect.service';

@Component({
  selector: 'app-cartelera-products',
  templateUrl: './cartelera-products.component.html',
  styleUrls: ['./cartelera-products.component.css']
})
export class CarteleraProductsComponent implements OnInit{

  constructor(
    private typingEffectService: TypingEffectService,
    private router: Router
  ){}

  startTyping(key: string, text: string) {
    this.typingEffectService.startTypingEffect(key, text);
  }

  ngOnInit() {
    this.startTyping('first', 'CarPlay y Android Auto');
    this.startTyping('second', 'Smart Glasses');
    this.startTyping('third', 'Prueba el nuevo dispositivo y olvidate de cables');
    this.startTyping('four', 'Las patillas se doblan');
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
