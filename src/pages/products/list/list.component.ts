import { StoreService } from './../../../core/services/store/store.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/core/services/models/product.models';
//servicio  modal
import { ConfirmCartService } from 'src/core/services/confirmCart/confirm-cart.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  products:IProduct[]=[];


  constructor(
    private storeService: StoreService,
    private router: Router,
    private confirmCartService: ConfirmCartService
  ){

  }

  ngOnInit(){
   this.getProducts();
  }

  private getProducts() {
    this.storeService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  confirmAndAddtoCart(product: any){
    this.addToCart(product);
    this.openConfirmCart(product);

  }

  addToCart(product: any): void {
    this.storeService.addToCart(product);
    this.router.navigate(['list']);
  }

  navigateDetail(id:string){
    this.router.navigate(['detail',id])
  }

  openConfirmCart(product:any){
    this.confirmCartService.openModal();
    this.confirmCartService.setProduct(product);
  }

}
