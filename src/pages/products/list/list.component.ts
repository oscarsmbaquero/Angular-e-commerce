import { StoreService } from './../../../core/services/store/store.service';
import { Component } from '@angular/core';
import { IProduct } from 'src/core/services/models/product.models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  products:IProduct[]=[];


  constructor(
    private storeService: StoreService
  ){

  }

  ngOnInit(){
   this.getProducts();
  }

  private getProducts() {
    this.storeService.getProducts().subscribe((products) => {
      this.products = products;
      console.log(this.products,18);
      
    });
  }

}
