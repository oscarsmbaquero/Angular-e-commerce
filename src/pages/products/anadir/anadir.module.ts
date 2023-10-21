import { AnadirRoutingModule } from './anadir-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; 
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
//primeng
import { MessagesModule } from 'primeng/messages';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AnadirComponent } from './anadir.component';



// form
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AnadirComponent
  ],
  imports: [
    CommonModule,
    AnadirRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule





  ]
})
export class AnadirModule { }
