import { Component } from '@angular/core';
//import { IUser } from '../../services/models/user-models';
import * as AOS from 'aos';

import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerUser: FormGroup;
  public submitted: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    //private userServices: UsersService,
    private router: Router,
    
  ) {
    this.registerUser = this.formBuilder.group({
      user: ['', [Validators.required ]],
      password: ['', [Validators.required]],
      mail: ['', [Validators.required]],
      tlf: ['', [Validators.required]],
    });
  }
  
  ngOnInit() {
    AOS.init({
      duration: 1550,
      delay: 550,
    });
  }

  public onSubmit(): void {
    // El usuario ha pulsado en submit->cambia a true submitted
    this.submitted = true;
    // Si el formulario es valido
    if (this.registerUser.valid) {
      // Creamos un Usuario y lo emitimos
      const user: any = {
        user: this.registerUser.get('user')?.value,
        password: this.registerUser.get('password')?.value,
        mail: this.registerUser.get('mail')?.value,
        tlf: this.registerUser.get('tlf')?.value,
      };
      console.log(user, 46);
      // this.userServices.login(user).subscribe(
      //   (response) => {
      //     console.log('Datos enviados con éxito');
      //     // this.snackBar.open(
      //     //   'El coche ha sido añadido correctamente',
      //     //   'Cerrar',
      //     //   {
      //     //     duration: 3000,
      //     //   }
      //     // );
      //     this.router.navigate(['list']);
      //   },
      //   (error) => {
      //     console.error('Error al enviar los datos', error);
      //   }
      // );
    }
  } 

}
