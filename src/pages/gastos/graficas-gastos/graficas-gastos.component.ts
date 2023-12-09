import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
//graficas
import { ChartData, ChartEvent, ChartType } from 'chart.js';


@Component({
  selector: 'app-graficas-gastos',
  templateUrl: './graficas-gastos.component.html',
  styleUrls: ['./graficas-gastos.component.css']
})
export class GraficasGastosComponent implements OnInit{

  @Input() gastos: any | undefined;

  /**
   * evento 
   */
  

  @Input('labels') barChartLabels: string[] = ['Enero', 'Febrero', 'Marzo',
   'Abril','Mayo','Junio','Julio', 'Agosto','Septiembre','Octubre','Noviembre','Diciembre'
  ];
  @Input('data') barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [0, 0],
      },
    ],
  };
  constructor(){
    console.log(this.gastos,'gastos');
    this.updateChartData(this.gastos)
  }

  ngOnInit(){


  }
  public barChartType: ChartType = 'bar';
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['gastos'] && changes['gastos'].currentValue) {
      //this.showGrafics();
      console.log();
    }
  }
  private updateChartData(gastos: any) {
    console.log(gastos,'gastos');
    
    const newData = {
      labels: this.barChartLabels,
      datasets: [{ data: gastos }],
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
