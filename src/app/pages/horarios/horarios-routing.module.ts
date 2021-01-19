import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HorariosComponent } from './horarios.component';

const rutas: Routes = [
  {
    path: '',
    component: HorariosComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(rutas) ],
  exports: [ RouterModule ]
})
export class HorariosRoutingModule { }
