import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Horario } from '../models/horario.model';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private endPoint = `${environment.apiUrl}/api/horarios`;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Horario[]> {
    return this.http.get(this.endPoint).pipe(
      map(response => response as Horario[])
    );
  }

}
