import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { HorariosComponent } from './horarios.component';
import { HorariosRoutingModule } from './horarios-routing.module';

@NgModule({
  declarations: [HorariosComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    HorariosRoutingModule,
  ],
})
export class HorariosModule {}
