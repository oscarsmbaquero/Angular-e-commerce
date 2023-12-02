import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class logoService  {
    private logoUrlSubject = new BehaviorSubject<string>('');
  logoUrl$ = this.logoUrlSubject.asObservable();

    logoUrl: string = '';
  logos: string[] = [
    //  'assets/images/logo.png',
    'assets/images/logo1.png',
    'assets/images/logo2.png',
    'assets/images/logo4.png',
    'assets/images/logo6.png',
    'assets/images/logo7.png',
    'assets/images/logo8.png',
    //  'assets/images/logo5.jpeg',
    //  'assets/images/logo6.jpeg',
    //  'assets/images/logo7.jpeg',
    //  'assets/images/logo8.jpeg',
    //  'assets/images/logo9.jpeg',
  ];

 
  constructor(){
    this.changeLogo(); // Llama a changeLogo en el constructor para establecer un logo inicial.
    setInterval(() => this.changeLogo(), 5000);
  }

private changeLogo() {
    const randomIndex = Math.floor(Math.random() * this.logos.length);
    const newLogoUrl = this.logos[randomIndex];
    this.logoUrlSubject.next(newLogoUrl);
  }
}