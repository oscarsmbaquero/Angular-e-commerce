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
//import { UsersService } from '../../services/users/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  
  checked = false;
  /**
   * mostrar el registro
   */
  showRegister = false;

  constructor() {}
   
  


 
register(){
  console.log('Hola');
  this.showRegister = !this.showRegister;
}

}
