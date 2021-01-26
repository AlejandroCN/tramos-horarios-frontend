import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HorariosComponent } from './horarios.component';
import { HorariosRoutingModule } from './horarios-routing.module';

@NgModule({
  declarations: [HorariosComponent],
  imports: [
    CommonModule,
    HorariosRoutingModule,
    FontAwesomeModule
  ]
})
export class HorariosModule { }
