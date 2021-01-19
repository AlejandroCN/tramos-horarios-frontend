import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

const rutas: Routes = [
  {
    path: '',
    component: PagesComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(rutas, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
