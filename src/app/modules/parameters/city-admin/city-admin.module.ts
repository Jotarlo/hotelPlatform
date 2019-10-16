import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityAdminRoutingModule } from './city-admin-routing.module';
import { CityListComponent } from './city-list/city-list.component';
import { CityCreatorComponent } from './city-creator/city-creator.component';
import { CityEditorComponent } from './city-editor/city-editor.component';


@NgModule({
  declarations: [CityListComponent, CityCreatorComponent, CityEditorComponent],
  imports: [
    CommonModule,
    CityAdminRoutingModule
  ]
})
export class CityAdminModule { }
