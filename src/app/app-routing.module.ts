import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

const rutas: Routes = [
  {
    path: '',
    component: PagesComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(rutas, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
