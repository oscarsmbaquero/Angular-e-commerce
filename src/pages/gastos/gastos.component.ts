
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IGasto } from 'src/core/services/models/gastos.model';
import { StoreService } from 'src/core/services/store/store.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit{

  gastos: any;

  pruebaInput: string='';

  @Output() showGrafics = new EventEmitter<string>();


  ngOnInit() {
    this.storeService.getGastos().subscribe((data) => {
      console.log(data);
      
        this.gastos = data;
        this.showGraficas(this.gastos);
    });
    // setTimeout(() => {
    //   this.showGraficas(this.gastos);
    // }, 2000);
    
}


  constructor(
    private formBuilder: FormBuilder,
    private storeService : StoreService
  ){
    // this.anadirGasto = this.formBuilder.group({
    //   nameClient: ['', [Validators.required ]],
    //   numberIssue: ['', [Validators.required]],
    //   type: ['', [Validators.required]],
    //   concepto: ['', [Validators.required]],
    //   price: ['', [Validators.required]],
    //   iva : [ '',[Validators.required]],
    //   priceFinal: ['', [Validators.required]],
    //   date: ['', [Validators.required]],
    // });
  }

  // public onSubmit(): void {
  //   this.submitted = true;
  //   if (this.anadirGasto.valid) {
  //     const newProduct: any = {
  //       nameClient: this.anadirGasto.get('nameClient')?.value,
  //       numberIssue: this.anadirGasto.get('numberIssue')?.value,
  //       type: parseFloat(this.anadirGasto.get('type')?.value),
  //       concepto: parseFloat(this.anadirGasto.get('concepto')?.value),
  //       price: parseFloat(this.anadirGasto.get('price')?.value),
  //       priceFinal: this.anadirGasto.get('priceFinal')?.value,
  //       iva: this.anadirGasto.get('iva')?.value,
  //       date: this.anadirGasto.get('date')?.value,
  //     };
  
  //     console.log(newProduct);
  
  //     //this.loading = true;
  
  //     // this.storeService.addProduct(newProduct).subscribe(
  //     //   (response: any) => {
  //     //     console.log('Datos enviados con éxito');
  //     //     // this.loading = false;
  //     //     // this.snackBar.open(
  //     //     //   'El producto ha sido añadido correctamente',
  //     //     //   'Cerrar',
  //     //     //   {
  //     //     //     duration: 3000,
  //     //     //   }
  //     //     // );
  //     //     this.router.navigate(['list']);
  //     //   },
  //     //   (error) => {
  //     //     console.error('Error al enviar los datos', error);
  //     //   }
  //     // );
  //   }
  // }
  showGraficas(gastos:IGasto){
    console.log(gastos,'gastos');
    
    
  }
}
