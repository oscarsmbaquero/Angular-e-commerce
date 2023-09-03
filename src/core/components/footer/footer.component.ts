import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  year: number =0;

  ngOnInit(){
    this.year = new Date().getFullYear();
  }

  getDate(){
    this.year = new Date().getFullYear(); 
  }

}
