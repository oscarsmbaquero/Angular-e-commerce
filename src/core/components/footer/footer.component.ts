import { Component, OnInit } from '@angular/core';
import { logoService } from 'src/core/services/logo/logo.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  logoUrl: string = '';
  year: number =0;

  constructor(
    private logoService:logoService
  ){

  }


  ngOnInit(){
    this.year = new Date().getFullYear();

    this.logoService.logoUrl$.subscribe(newLogoUrl => {
      this.logoUrl = newLogoUrl;
    });
  }

  getDate(){
    this.year = new Date().getFullYear(); 
  }

}
