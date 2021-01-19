import { Component, OnDestroy, OnInit } from '@angular/core';
import { Client, IStompSocket } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

import { environment } from 'src/environments/environment';
import { Horario } from '../../models/horario.model';
import { HorariosService } from '../../services/horarios.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit, OnDestroy {

  public horarios: Horario[];

  private clientSocket: Client;

  constructor(private horariosService: HorariosService) { }

  ngOnInit(): void {
    this.obtenerHorarios();
    this.configurarSocket();
  }

  ngOnDestroy(): void {
    this.clientSocket.deactivate();
  }

  configurarSocket(): void {
    this.clientSocket = new Client();
    this.clientSocket.webSocketFactory = () => {
      return new SockJS(`${environment.apiUrl}/ws`) as IStompSocket;
    };

    this.clientSocket.onConnect = () => {
      console.log('ws connected');
      this.clientSocket.subscribe('/realtime/cambioHorarios', (resp) => {
        this.actualizarHorario(JSON.parse(resp.body) as Horario);
      });
    };

    this.clientSocket.activate();
  }

  obtenerHorarios(): void {
    this.horariosService.findAll().subscribe(horarios => {
      this.horarios = horarios;
    });
  }

  actualizarHorario(horarioActualizado: Horario): void {
    const horarioExistente = this.horarios.find(h => h.id === horarioActualizado.id);
    horarioExistente.contadorReservaciones = horarioActualizado.contadorReservaciones;
  }

  seleccionarHorario(horario: Horario): void {
    if (horario.contadorReservaciones < 8) {
      horario.seleccionado = !horario.seleccionado;

      if (horario.seleccionado) {
        this.reservarHorario(horario.id);
      } else {
        this.liberarHorario(horario.id);
      }
    }
  }

  reservarHorario(id: number): void {
    this.clientSocket.publish({
      destination: '/app/reservarHorario',
      body: JSON.stringify(id)
    });
  }

  liberarHorario(id: number): void {
    this.clientSocket.publish({
      destination: '/app/liberarHorario',
      body: JSON.stringify(id)
    });
  }

}
