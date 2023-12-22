import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { StoreService } from 'src/core/services/store/store.service';
import { ChartData, ChartType } from 'chart.js';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit{
  data: any;

  public barChartType: ChartType = 'bar';

   barChartLabels: string[] = [''];

   @Input('data') barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [0],
      },
    ],
  };

  options: any;

  totalSale = 0;
  totalGasto = 0;
  salesByMothot: any;

  constructor(
    private storeServices: StoreService
  ){

  }

  ngOnInit() {   
    // this.getOrders();
    // this.getGastos();
    this.getDataForChart();
}
getDataForChart() {
  forkJoin({
    sales: this.storeServices.getOrders(),
    expenses: this.storeServices.getGastos(),
  }).subscribe(({ sales, expenses }) => {
    const salesByMonth: { [month: string]: number } = {};
    const expensesByMonth: { [month: string]: number } = {};

    // Procesar datos de ventas
    for (let order of sales) {
      if (order.createdAt) {
        const orderMonth = new Date(order.createdAt).toLocaleString('es-ES', { month: 'numeric' });
        salesByMonth[orderMonth] = (salesByMonth[orderMonth] || 0) + order.salePrice;
        this.totalSale += order.salePrice;
      }
    }

    // Procesar datos de gastos
    for (let gasto of expenses) {
      if (gasto.createdAt) {
        const orderMonth = new Date(gasto.createdAt).toLocaleString('es-ES', { month: 'numeric' });
        expensesByMonth[orderMonth] = (expensesByMonth[orderMonth] || 0) + gasto.priceFinal;
        this.totalGasto += gasto.priceFinal;
      }
    }
    

    this.updateChartData(salesByMonth, expensesByMonth);
  });
}

// getGastos(): void{
//   this.storeServices.getGastos().subscribe((gastos)=>{
//     const gastosByMonth: { [month: string]: number } = {};
//     for( let gasto of gastos){
//       if(gasto.createdAt){
//         const orderMonth = new Date(gasto.createdAt).toLocaleString('es-ES', { month: 'numeric' });
//         gastosByMonth[orderMonth] = (gastosByMonth[orderMonth] || 0) + gasto.priceFinal;
//          this.totalGasto += gasto.priceFinal;
       
        
//       }
//     }
//     console.log(gastosByMonth,51);
//     this.updateChartData(gastosByMonth);

//   })
// }

/**
 * Metodo que obtiene las ventas
 */
// getOrders() {
//   this.storeServices.getOrders().subscribe((orders) => {
//     console.log(orders);
//     const salesByMonth: { [month: string]: number } = {};

//     for (let order of orders) {
//       if (order.createdAt) {
//         // Obtener el mes de la fecha de creación
//         const orderMonth = new Date(order.createdAt).toLocaleString('es-ES', { month: 'numeric' });
//         // Sumar la venta al mes correspondiente
//         salesByMonth[orderMonth] = (salesByMonth[orderMonth] || 0) + order.salePrice;
//         this.totalSale += order.salePrice;
//       }
//     }
//     // Convertir el objeto en un array de objetos
//     const salesArray = Object.keys(salesByMonth).map((month) => ({
//       month,
//       totalSale: salesByMonth[month],
//     }));
//     this.updateChartData(salesByMonth);
//   });
// }
// private updateChartData(salesByMonth: { [month: string]: number }) {
//   const salesArray = Object.keys(salesByMonth).map((month) => ({
//     month,
//     totalSale: salesByMonth[month],
//   }));
//   const newData: ChartData<'bar'> = {
//     labels: salesArray.map((item) => item.month),
//     datasets: [{
//       data: salesArray.map((item) => item.totalSale),
//       backgroundColor: ['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(0, 0, 255, 0.5)', 'rgba(220, 20, 102, 0.5)', 'rgba(115, 110, 5, 1)', 'rgba(250, 0, 255, 0.5)'],
//       borderColor: '#36A2EB',
//     }],
//   };
//   this.barChartData = newData;
// }
private updateChartData(salesByMonth: { [month: string]: number }, expensesByMonth: { [month: string]: number }) {
  const salesArray = Object.keys(salesByMonth).map((month) => ({
    month,
    totalSale: salesByMonth[month],
  }));
  const expensesArray = Object.keys(expensesByMonth).map((month) => ({
    month,
    totalExpense: expensesByMonth[month],
  }));
  const newData: ChartData<'bar'> = {
    labels: salesArray.map((item) => item.month),
    datasets: [
      {
        label: 'Ventas',
        data: salesArray.map((item) => item.totalSale),
        backgroundColor: ['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(0, 0, 255, 0.5)', 'rgba(220, 20, 102, 0.5)', 'rgba(115, 110, 5, 1)', 'rgba(250, 0, 255, 0.5)'],
        borderColor: '#36A2EB',
      },
      {
        label: 'Gastos',
        data: expensesArray.map((item) => item.totalExpense),
        backgroundColor: ['rgba(255, 255, 0, 0.5)', 'rgba(0, 128, 0, 0.5)', 'rgba(70, 130, 180, 0.5)', 'rgba(255, 69, 0, 0.5)', 'rgba(139, 69, 19, 0.5)', 'rgba(128, 0, 128, 0.5)'],
        borderColor: '#FFD700',
      },
    ],
  };
  this.barChartData = newData;
}


/**
 * Opciones de graficas
 */
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
