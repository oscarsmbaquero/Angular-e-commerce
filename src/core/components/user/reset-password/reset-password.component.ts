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
import { IUser } from 'src/core/services/models/user-models';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  /**
   * flag para pintar el loader
   */
  loading = false;

  public resetPassword: FormGroup;
  public submitted: boolean = false;
  mail: string = '';
  /**
   * Mostrar el resto del formualrio si coincide el mail
   */
  showRestForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.resetPassword = this.formBuilder.group({
      mail: ['', [Validators.required]],
      // password: [''],
      // confirmPassword:[''],
    });
  }

  public onSubmit(): void {
    this.loading = true;
    // El usuario ha pulsado en submit->cambia a true submitted
    this.submitted = true;
    // Si el formulario es valido
    if (this.resetPassword.valid) {
      const user: any = {
        mail: this.resetPassword.get('mail')?.value,
        // password: this.resetPassword.get('password')?.value,
        // confirmPassword: this.resetPassword.get('confirmPassword')?.value,
      };
      console.log(user, 46);
      // if (this.showRestForm) {
      //   this.usersService.changePassword(user.mail,user.password).subscribe((response)=>{
      //     console.log(response);
      //     this.router.navigate(['/user']);
      //     // const prueba = response.previousUser.user;
      //     // console.log(prueba);
      //     // const userLogged={
      //     //   user: response.data.previousUser.user,
      //     //   password: response.data.previousUser.password
      //     // }
      //     // this.usersService.login(userLogged).subscribe((response)=>{
      //     //   console.log(response);
      //     // })

      //   });
      // } else {
      this.usersService.getUSerByMail(user.mail).subscribe((response) => {
        console.log(response);
        if (response) {
          const userMail = response.mail; // Accede al objeto "data"
          console.log(userMail, 'userMail');
          this.usersService.resetPassword(userMail).subscribe(
            (response) => {
              this.loading = false;
              console.log(response, 'response');
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
              if (error.status !== 200) {
                this.snackBar.open(
                  'Usuario o contraseña incorrectas',
                  'Cerrar',
                  {
                    duration: 3000,
                  }
                );
              }
              console.log(error.status, 'status');
            }
          );
        } else {
          //this.showRestForm = false;
          console.log('No');
        }
      });
      //}

      // this.usersService.resetPassword(this.mail).subscribe(
      //   (response) => {
      //     this.loading = false;
      //     console.log(response,'response');
      //     console.log('Datos enviados con éxito');
      //     this.snackBar.open(
      //       'Hemos enviado un enlace a tu email',
      //       'Cerrar',
      //       {
      //         duration: 3000,
      //       }
      //     );
      //     this.router.navigate(['list']);
      //   },
      //   (error) => {
      //     this.loading = false;
      //     console.error('Error al enviar los datos', error);
      //     if(error.status !== 200){
      //         this.snackBar.open(
      //       'Usuario o contraseña incorrectas',
      //       'Cerrar',
      //       {
      //         duration: 3000,
      //       }
      //     );
      //     }
      //     console.log(error.status,'status');
      //   }
      // );
    }
  }
}
