import { Rol } from './rol.model';
import { Horario } from './horario.model';

export class Usuario {

  id: number;
  username: string;
  email: string;
  foto: string;
  password: string;
  signUpWithGoogle: boolean;
  rol: Rol;
  enabled: boolean;
  horarios: Horario[];

}
