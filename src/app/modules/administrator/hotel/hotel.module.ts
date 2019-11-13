import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelRoutingModule } from './hotel-routing.module';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelCreatorComponent } from './hotel-creator/hotel-creator.component';
import { HotelEditorComponent } from './hotel-editor/hotel-editor.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [HotelListComponent, HotelCreatorComponent, HotelEditorComponent],
  imports: [
    CommonModule,
    HotelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class HotelModule { }
