
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StoreService } from 'src/core/services/store/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-gastos',
  templateUrl: './anadirGastos.component.html',
  styleUrls: ['./anadirGastos.component.css']
})
export class AddGastosComponent {

  public anadirGasto: FormGroup;
  public submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private router: Router
  ){
    this.anadirGasto = this.formBuilder.group({
      nameClient: ['', [Validators.required ]],
      numberIssue: ['', [Validators.required]],
      type: ['', [Validators.required]],
      concepto: ['', [Validators.required]],
      price: ['', [Validators.required]],
      iva : [ '',[Validators.required]],
      priceFinal: ['', [Validators.required]],
      image : ['']
      //date: [''],
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.anadirGasto) {
      const newGasto: any = {
        nameClient: this.anadirGasto.get('nameClient')?.value,
        numberIssue: this.anadirGasto.get('numberIssue')?.value,
        type: this.anadirGasto.get('type')?.value,
        concepto: this.anadirGasto.get('concepto')?.value,
        price: parseFloat(this.anadirGasto.get('price')?.value),
        priceFinal: parseFloat(this.anadirGasto.get('priceFinal')?.value),
        iva: this.anadirGasto.get('iva')?.value,
        date: this.anadirGasto.get('date')?.value,
        image: this.anadirGasto.get('image')?.value,
      };
      //this.loading = true;
  
      this.storeService.addGasto(newGasto).subscribe(
        (response: any) => {
          console.log('Datos enviados con éxito');
          console.log(response);
          
          // this.loading = false;
          // this.snackBar.open(
          //   'El producto ha sido añadido correctamente',
          //   'Cerrar',
          //   {
          //     duration: 3000,
          //   }
          // );
          this.router.navigate(['list']);
        },
        (error) => {
          console.error('Error al enviar los datos', error);
        }
      );
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file, 61);
    this.anadirGasto.get('image')?.setValue(file);
  }

  
}
