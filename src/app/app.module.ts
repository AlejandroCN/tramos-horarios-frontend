import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from './services/interceptors/token.interceptor';
import { PaginadorEsp } from './models/paginador-esp';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: MatPaginatorIntl, useClass: PaginadorEsp },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
