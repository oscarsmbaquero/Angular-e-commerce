
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { StoreService } from 'src/core/services/store/store.service';
import { FormsModule } from '@angular/forms';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IProduct } from 'src/core/services/models/product.models';
@Component({
  selector: 'app-anadir',
  templateUrl: './anadir.component.html',
  styleUrls: ['./anadir.component.css']
})
export class AnadirComponent {

  public anadirProduct: FormGroup;
  public submitted: boolean = false;

  private submitSubscription: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private router: Router,
    
  ) {
    this.anadirProduct = this.formBuilder.group({
      name: ['', [Validators.required ]],
      description: ['', [Validators.required]],
      pCompra: ['', [Validators.required]],
      pvp: ['', [Validators.required]],
      unidades: ['', [Validators.required]],
      image : [ '',[Validators.required]]
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.anadirProduct.valid) {
      const newProduct: any = {
        name: this.anadirProduct.get('name')?.value,
        description: this.anadirProduct.get('description')?.value,
        pCompra: parseFloat(this.anadirProduct.get('pCompra')?.value),
        pvp: parseFloat(this.anadirProduct.get('pvp')?.value),
        unidades: parseFloat(this.anadirProduct.get('unidades')?.value),
        image: this.anadirProduct.get('image')?.value,
      };  
      this.storeService.addProduct(newProduct).subscribe(
        (response: any) => {
          console.log('Datos enviados con éxito');
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
  
  
  /**
   * Añadir la imagen
   * @param event 
   */
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file, 61);
    this.anadirProduct.get('image')?.setValue(file);
  }

}
