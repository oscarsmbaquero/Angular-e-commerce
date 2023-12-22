import { StoreService } from './../../../core/services/store/store.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { IProduct } from 'src/core/services/models/product.models';

@Component({
  selector: 'app-top-ventas',
  templateUrl: './top-ventas.component.html',
  styleUrls: ['./top-ventas.component.css']
})
export class TopVentasComponent implements OnInit{

  products: IProduct[] = [];
  
  public barChartType: ChartType = 'bar';

   barChartLabels: string[] = ['Gastos'];

   //pruebaInput:string='';

  @Input('data') barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [0],
      },
    ],
  };
  constructor(
    private storeService: StoreService
  ){
    
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['pruebaInput'] && changes['pruebaInput'].currentValue) {
  //     this.showGrafics();
  //   }
  // }
  // showGrafics() {
  //  this.getProducts();
  // }

  ngOnInit(): void {
    this.getProducts();
  }
  

 

  private getProducts() {
    this.storeService.getProducts().subscribe((products) => {
      this.products = products;
      console.log(this.products);
      this.updateChartData(this.products);
    });
  }
  private updateChartData(products: IProduct[]) {
    const newData: ChartData<'bar'> = {
      labels: products.map(product => product.name),
      datasets: [{
        data: products.map(product => product.unidadesVendidas),
        backgroundColor: ['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(0, 0, 255, 0.5)', 'rgba(220, 20, 102, 0.5)', 'rgba(115,110,5,1)', 'rgba(250, 0, 255, 0.5)'],
       
      }],
    };
    this.barChartData = newData;
  }
  public barChartOptions: any = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    datasets: {
      bar: {
        backgroundColor: ['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(0, 0, 255, 0.5)','rgba(220, 20, 102, 0.5)','rgba(115,110,5,1)','rgba(250, 0, 255, 0.5)'],
      },
    },
  };
  

}
