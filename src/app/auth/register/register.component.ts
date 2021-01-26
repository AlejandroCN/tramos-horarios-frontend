import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import { ValidationService } from '../../services/validation.service';
import { UsuariosService } from '../../services/usuarios.service';

import { Usuario } from 'src/app/models/usuario.model';
import { Rol } from '../../models/rol.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/login.component.css']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  public cargando: boolean;

  public faKey = faKey;
  public faSync = faSync;

  constructor(private validation: ValidationService,
              private usuariosService: UsuariosService,
              private router: Router) {
    this.cargando = false;
  }

  ngOnInit(): void {
    this.configurarForm();
  }

  configurarForm(): void {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        Validators.pattern(this.validation.alfaNum)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(80),
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        Validators.pattern(this.validation.alfaNum)
      ])
    });
  }

  registrar(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.cargando = true;
      const usuario = this.construirUsuario();

      this.usuariosService.save(usuario).subscribe(u => {
        Swal.fire({
          icon: 'success',
          title: 'Registrado!',
          text: 'Su registro se realizó correctamente'
        });
        this.router.navigateByUrl('/auth/login');
        this.cargando = false;
      }, err => {
        console.log(err);
        Swal.fire({
          title: 'Algo salió muy mal!',
          icon: 'error',
          text: err.error.mensaje
        });
      });
      this.cargando = false;
    }
  }

  construirUsuario(): Usuario {
    const usuario = {
      username: this.form.get('username').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value
    };

    return usuario as Usuario;
  }

}
