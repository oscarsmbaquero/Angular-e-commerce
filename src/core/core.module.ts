
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';


import { RouterModule } from '@angular/router'; // Import the RouterModule here

import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';

import {MatSidenavModule} from '@angular/material/sidenav';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    RouterModule,
    BadgeModule,
    AvatarModule
  ],
  exports:[
    HeaderComponent,
    NavbarComponent,
    FooterComponent
  ],
})
export class CoreModule { }
