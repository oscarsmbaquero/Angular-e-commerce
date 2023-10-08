import { Component } from '@angular/core';
import { StoreService } from 'src/core/services/store/store.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  data: any;

  options: any;

  constructor(
    private storeServices: StoreService
  ){

  }

  ngOnInit(
    
  ) {
    this.getOrders();
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
   
    


    this.data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
                'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'  
      ],
        datasets: [
            {
                label: 'ventas',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                //data: [65, 59, 80, 81, 56, 55, 40]
                data: []
            },
            {
                label: 'My Second dataset',
                backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    this.options = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
}

// getOrders(){
//   this.storeServices.getOrders().subscribe((element)=>{
//     console.log(element);
//   })
// }
private actualizarRegistro(objects: any[]) {
  // Crea un objeto para mantener el recuento de ventas por mes
  const objectCountByMonth: Record<string, number> = {};

  // Recorre los objetos y actualiza el recuento por mes
  objects.forEach((obj) => {
    const objDate = new Date(obj.createdAt);
    const monthKey = `${objDate.getFullYear()}-${objDate.getMonth() + 1}`;
    console.log(monthKey,'montkey');
    console.log(objDate,'objDate');
    // Obtiene el año y el mes
const year = objDate.getFullYear();
const month = objDate.getMonth() + 1; // Nota: getMonth() devuelve 0 para enero, 1 para febrero, etc.

// Convierte la fecha en "YYYY-MM"
const fechaFormateada = `${year}-${month < 10 ? '0' : ''}${month}`;
console.log(fechaFormateada,'fechaFormateda');
console.log(objectCountByMonth,'object');
    if (!objectCountByMonth[fechaFormateada]) {
      console.log('no');
      objectCountByMonth[fechaFormateada] = 1;
    } else {
      objectCountByMonth[fechaFormateada]++;
      console.log('Si');
    }
  });

  // Luego, actualiza los datos para el dataset 'ventas' en la propiedad 'data'
  this.data.datasets[0].data = this.transformDataForChart(objectCountByMonth);
}

// Función para transformar los datos en el formato necesario para el gráfico
// Función para transformar los datos en el formato necesario para el gráfico
// Función para transformar los datos en el formato necesario para el gráfico
private transformDataForChart(data: Record<string, number>): number[] {
  const chartData: number[] = [];

  // Recorre los meses en el orden en que aparecen en this.data.labels
  for (const label of this.data.labels) {
    // Convierte el nombre del mes en la clave esperada
    const key = label.toLowerCase(); // Convierte "Octubre" a "octubre"
    console.log(key);
    // Obtiene el valor correspondiente del objeto de datos
    const monthData = data[key] || 0; // Obtiene el valor del mes o establece 0 si no hay datos
    console.log(monthData,'monthData');
    chartData.push(monthData);
  }

  return chartData;
}



getOrders() {
  this.storeServices.getOrders().subscribe((element) => {
    console.log(element);
    // Actualiza el registro con los datos recibidos
    this.actualizarRegistro(element);

    // Ahora puedes acceder a this.data para usarlo en tu gráfica
    console.log('Datos actualizados para la gráfica:', this.data);
  });
}

}
