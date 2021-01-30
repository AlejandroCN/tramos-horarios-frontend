import { Usuario } from './usuario.model';
import { Horario } from './horario.model';
import { StompMessage } from './stomp-message.model';

export class CambioHorario extends StompMessage {

  usuario: Usuario;
  horarioAModificar: Horario;

}
