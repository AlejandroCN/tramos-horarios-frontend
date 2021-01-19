import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const rutas: Routes = [
  {
    path: 'horarios',
    loadChildren: () => import('./horarios/horarios.module').then(m => m.HorariosModule)
  },
  {
    path: '',
    redirectTo: '/horarios',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forChild(rutas) ],
  exports: [ RouterModule ]
})
export class PagesRoutingModule { }
