import { Component } from '@angular/core';
import { IUser } from 'src/core/services/models/user-models';
import { UsersService } from 'src/core/services/users/users.service';
import * as AOS from 'aos';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/api';

import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
//import { UsersService } from '../../services/users/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {

  messages1: Message[] | undefined;

  public loginUser: FormGroup;
  public submitted: boolean = false;
  
  checked = false;
  /**
   * mostrar el registro
   */
  showRegister = false;

  messageLogin= false;
  /**
   * flag para pintar el loader
   */
  loading= false;

  constructor(
    private formBuilder: FormBuilder,
    private userServices: UsersService,
    private router: Router,
    private snackBar: MatSnackBar,
    private messageService: MessageService
    
  ) {
    this.loginUser = this.formBuilder.group({
      user: ['', [Validators.required ]],
      password: ['', [Validators.required]],
    });
  }
  
  ngOnInit() {
    this.messages1 = [
      { severity: 'error', summary: 'Error', detail: 'Debe de registrarse o acceder con tu usuario' },
  ];
    this.messageLogin = sessionStorage.getItem('messageLogin') === 'true';
    
    AOS.init({
      duration: 1550,
      delay: 550,
    });
  }

  public onSubmit(): void {
    this.loading = true;
    // El usuario ha pulsado en submit->cambia a true submitted
    this.submitted = true;
    // Si el formulario es valido
    if (this.loginUser.valid) {
      // Creamos un Usuario y lo emitimos
      const user: any = {
        user: this.loginUser.get('user')?.value,
        password: this.loginUser.get('password')?.value,
      };
      console.log(user, 46);
      this.userServices.login(user).subscribe(
        (response) => {
          this.loading = false;
          console.log(response);
          console.log('Datos enviados con éxito');
          this.snackBar.open(
            'Usurio Logueado Correctamente',
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
register(){
  console.log('Hola');
  this.showRegister = !this.showRegister;
}

}
