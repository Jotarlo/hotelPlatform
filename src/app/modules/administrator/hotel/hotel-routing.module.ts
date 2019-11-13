import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelCreatorComponent } from './hotel-creator/hotel-creator.component';
import { HotelEditorComponent } from './hotel-editor/hotel-editor.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';


const routes: Routes = [
  {
    path: 'creator',
    component: HotelCreatorComponent
  },
  {
    path: 'editor/:id',
    component: HotelEditorComponent
  },
  {
    path: 'list',
    component: HotelListComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/list'
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelRoutingModule { }
