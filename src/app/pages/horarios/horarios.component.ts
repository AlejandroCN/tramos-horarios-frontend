import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Client, IStompSocket } from '@stomp/stompjs';
import { faHome, faSpinner } from '@fortawesome/free-solid-svg-icons';
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
  styleUrls: ['./horarios.component.css'],
})
export class HorariosComponent implements OnInit, OnDestroy {
  private clientSocket: Client;
  public faSpinner = faSpinner;
  public faHome = faHome;

  public horarios: Horario[];
  public usuario: Usuario;
  public cargando: boolean;

  // parametros de paginacion para la tabla de horarios
  public numPag: number;
  public tamPag: number;

  public displayedColumns: string[] = ['hora', 'contadorReservaciones'];
  public dataSource: MatTableDataSource<Horario> = null;

  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatTable, { static: true }) public table: MatTable<any>;

  constructor(
    private horariosService: HorariosService,
    private authService: AuthService
  ) {
    this.usuario = this.authService.usuario;
    this.cargando = true;
    this.numPag = 1;
    this.tamPag = 5;
  }

  ngOnInit(): void {
    this.obtenerHorarios();
    this.configurarSocket();
  }

  ngOnDestroy(): void {
    this.clientSocket.deactivate();
  }

  private initMatTable(): void {
    this.dataSource = new MatTableDataSource<Horario>(this.horarios);
    this.dataSource.paginator = this.paginator;

    this.table.renderRows();
  }

  configurarSocket(): void {
    this.clientSocket = new Client();
    this.clientSocket.webSocketFactory = () => {
      return new SockJS(`${environment.apiUrl}/ws`) as IStompSocket;
    };

    this.clientSocket.onConnect = () => {
      console.log('ws connected');
      this.clientSocket.subscribe('/realtime/cambioHorarios', (resp) => {
        setTimeout(() => {
          const cambioHorario = JSON.parse(resp.body) as CambioHorario;
          if (cambioHorario.error) {
            console.log(cambioHorario.mensaje);
          } else {
            this.actualizarContadorHorario(cambioHorario.horarioAModificar);

            if (cambioHorario.usuario.id === this.authService.usuario.id) {
              this.actualizarHorarioModificado(cambioHorario);
              this.marcarHorariosSeleccionados();
            }
          }
        }, 1200);
      });
    };

    this.clientSocket.activate();
  }

  obtenerHorarios(): void {
    this.horariosService.findAll().subscribe((horarios) => {
      this.horarios = horarios;
      this.marcarHorariosSeleccionados();
      this.initMatTable();
      this.cargando = false;
    });
  }

  actualizarHorarioModificado(cambioHorario: CambioHorario): void {
    this.authService.usuario = cambioHorario.usuario;
    const horarioExistente = this.horarios.find(
      (h) => h.id === cambioHorario.horarioAModificar.id
    );
    horarioExistente.actualizando = false;
    horarioExistente.seleccionado = !horarioExistente.seleccionado;
  }

  marcarHorariosSeleccionados(): void {
    this.horarios.forEach((horario) => {
      if (
        this.authService.usuario.horarios.find(
          (horarioSelec) => horarioSelec.id === horario.id
        )
      ) {
        horario.seleccionado = true;
      } else {
        horario.seleccionado = false;
      }
    });
  }

  actualizarContadorHorario(horarioActualizado: Horario): void {
    const horarioExistente = this.horarios.find(
      (h) => h.id === horarioActualizado.id
    );
    horarioExistente.contadorReservaciones =
      horarioActualizado.contadorReservaciones;
  }

  seleccionarHorario(horario: Horario): void {
    if (
      (horario.contadorReservaciones < 8 || horario.seleccionado) &&
      !horario.actualizando
    ) {
      horario.actualizando = true;

      const cambioHorario: CambioHorario = {
        usuario: this.authService.usuario,
        horarioAModificar: horario,
      };
      this.clientSocket.publish({
        destination: '/app/seleccionarHorario',
        body: JSON.stringify(cambioHorario),
      });
    }
  }
}
