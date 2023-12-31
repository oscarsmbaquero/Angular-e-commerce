import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/core/services/users/users.service';
//import { IUser } from '../../services/models/user-models';
import * as AOS from 'aos';
import { MatSnackBar } from '@angular/material/snack-bar';
import { logoService } from 'src/core/services/logo/logo.service';

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
export class RegisterComponent implements OnInit{

  logoUrl: string = '';

  public registerUser: FormGroup;
  public submitted: boolean = false;

 
  constructor(
    private formBuilder: FormBuilder,
    private userServices: UsersService,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private logoService: logoService,
    
  ) {
    this.registerUser = this.formBuilder.group({
      user: ['', [Validators.required ]],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]],
      mail: ['', [Validators.required]],
      tlf: ['', [Validators.required]],
    });
  }
  
  ngOnInit() {
    AOS.init({
      duration: 1550,
      delay: 550,
    });
    this.logoService.logoUrl$.subscribe(newLogoUrl => {
      this.logoUrl = newLogoUrl;
    });
  }

  public onSubmit(): void {
    //this.loading = true;
    // El usuario ha pulsado en submit -> cambia a true submitted
    this.submitted = true;
    // Si el formulario es valido
    if (this.registerUser.valid) {
      // Crear un objeto de usuario con los datos del formulario
      const user: any = {
        user: this.registerUser.get('user')?.value,
        password: this.registerUser.get('password')?.value,
        repassword: this.registerUser.get('repassword')?.value,
        mail: this.registerUser.get('mail')?.value,
        tlf: this.registerUser.get('tlf')?.value,
      };
      if(user.password !== user.repassword){
        this.matSnackBar.open(
          'La contraseña debe de coincidir',
          'Cerrar',
          {
            duration: 5000,
          }
        );
      }else{
// Llamar al servicio para registrar al usuario
this.userServices.register(user).subscribe(
  (response) => {
    //this.loading = false;
    console.log('Datos enviados con éxito');
    // this.snackBar.open(
    //   'Usuario registrado correctamente',
    //   'Cerrar',
    //   {
    //     duration: 3000,
    //   }
    // );
    this.router.navigate(['list']);
  },
  (error) => {
    if (error.status === 500) {
      this.matSnackBar.open(
        'Ya existe un usuario con ese email',
        'Cerrar',
        {
          duration: 5000,
        }
      );
    }
    console.log(error.status, 'status');
  }
);
      }
      
      
    }
  }
  
  

}
