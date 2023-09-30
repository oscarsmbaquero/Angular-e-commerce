import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListRoutingModule } from './list-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule
import { BadgeModule } from 'primeng/badge';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    SharedModule,
    DataViewModule,
    RatingModule,
    FormsModule,
    TagModule,
    ToastModule,
    BadgeModule
    
    
  ],exports:[
    
  ],
})
export class ListModule { }
