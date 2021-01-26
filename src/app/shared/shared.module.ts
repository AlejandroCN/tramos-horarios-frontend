import { NgModule } from '@angular/core';

import { NavbarComponent } from './navbar/navbar.component';
import { NoimagePipe } from './pipes/noimage.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    NoimagePipe
  ],
  exports: [
    NavbarComponent,
    NoimagePipe
  ]
})
export class SharedModule { }
