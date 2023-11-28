import { UsersService } from 'src/core/services/users/users.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

   /**
   * flag para pintar el loader
   */
   loading= false;

  public resetPassword: FormGroup;
  public submitted: boolean = false;
  mail:string='';

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar,
  ){
    this.resetPassword = this.formBuilder.group({
      mail: ['', [Validators.required ]],
      
    });
  }

  public onSubmit(): void {
    this.loading = true;
    // El usuario ha pulsado en submit->cambia a true submitted
    this.submitted = true;
    // Si el formulario es valido
    if (this.resetPassword.valid) {
      // Creamos un Usuario y lo emitimos
     
        this.mail= this.resetPassword.get('mail')?.value,
        
   
      console.log(this.mail, 46);
     
      this.usersService.resetPassword(this.mail).subscribe(
        (response) => {
          this.loading = false;
          console.log(response,'response');
          console.log('Datos enviados con éxito');
          this.snackBar.open(
            'Hemos enviado un enlace a tu email',
            'Cerrar',
            {
              duration: 3000,
            }
          );
          this.router.navigate(['list']);
        },
        (error) => {
          this.loading = false;
          console.error('Error al enviar los datos', error);
          if(error.status !== 200){
              this.snackBar.open(
            'Usuario o contraseña incorrectas',
            'Cerrar',
            {
              duration: 3000,
            }
          );
          }
          console.log(error.status,'status');
        }
      );
    }
  } 
}
