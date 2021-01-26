import { Component, OnDestroy, OnInit } from '@angular/core';
import { Client, IStompSocket } from '@stomp/stompjs';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import * as SockJS from 'sockjs-client';

import { HorariosService } from '../../services/horarios.service';
import { AuthService } from '../../services/auth.service';

import { environment } from 'src/environments/environment';
import { Horario } from '../../models/horario.model';
import { CambioHorario } from '../../models/cambio-horario.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit, OnDestroy {

  private clientSocket: Client;
  public faSpinner = faSpinner;

  public horarios: Horario[];
  public usuario: Usuario;
  public cargando: boolean;

  constructor(private horariosService: HorariosService,
              private authService: AuthService) {
    this.usuario = this.authService.usuario;
    this.cargando = true;
  }

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
        const cambioHorario = JSON.parse(resp.body) as CambioHorario;
        this.actualizarContadorHorario(cambioHorario.horarioAModificar);

        if (cambioHorario.usuario.id === this.authService.usuario.id) {
          this.authService.usuario = cambioHorario.usuario;
          this.marcarHorariosSeleccionados();
        }
      });
    };

    this.clientSocket.activate();
  }

  obtenerHorarios(): void {
    this.horariosService.findAll().subscribe(horarios => {
      this.horarios = horarios;
      this.marcarHorariosSeleccionados();
      this.cargando = false;
    });
  }

  marcarHorariosSeleccionados(): void {
    this.horarios.forEach(horario => {
      if (this.authService.usuario.horarios.find(horarioSelec => horarioSelec.id === horario.id)) {
        horario.seleccionado = true;
      } else {
        horario.seleccionado = false;
      }
    });
  }

  actualizarContadorHorario(horarioActualizado: Horario): void {
    const horarioExistente = this.horarios.find(h => h.id === horarioActualizado.id);
    horarioExistente.contadorReservaciones = horarioActualizado.contadorReservaciones;
  }

  seleccionarHorario(horario: Horario): void {
    if (horario.contadorReservaciones < 8 || horario.seleccionado) {
      horario.seleccionado = !horario.seleccionado;

      if (horario.seleccionado) {
        this.reservarHorario(horario);
      } else {
        this.liberarHorario(horario);
      }
    }
  }

  reservarHorario(horario: Horario): void {
    const cambioHorario: CambioHorario = {
      usuario: this.authService.usuario,
      horarioAModificar: horario
    };

    this.clientSocket.publish({
      destination: '/app/reservarHorario',
      body: JSON.stringify(cambioHorario)
    });
  }

  liberarHorario(horario: Horario): void {
    const cambioHorario: CambioHorario = {
      usuario: this.authService.usuario,
      horarioAModificar: horario
    };

    this.clientSocket.publish({
      destination: '/app/liberarHorario',
      body: JSON.stringify(cambioHorario)
    });
  }

}
