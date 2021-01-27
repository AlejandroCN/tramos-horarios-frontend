import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import { ScriptsService } from '../../services/scripts.service';
import { AuthService } from '../../services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';

declare const document: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public cargando: boolean;

  public faKey = faKey;
  public faSync = faSync;

  constructor(private scriptsService: ScriptsService,
              private authService: AuthService,
              private zone: NgZone) {
    this.cargando = false;
  }

  ngOnInit(): void {
    this.scriptsService.load('google-platform').then(() => {
      this.startApp();
    }).catch(error => console.log(error));
    this.configurarForm();
  }

  configurarForm(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  iniciarSesion(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.cargando = true;

      const usuario: Usuario = new Usuario();
      usuario.username = this.form.get('username').value;
      usuario.password = this.form.get('password').value;

      this.authService.login(usuario).subscribe((resp: any) => {
        this.authService.guardarDatosSesion(resp.token);
        this.authService.paginaInicio();
        this.cargando = false;
      }, err => {
        if (err.status === 404 || err.status === 500) {
          Swal.fire('Error', err.error.mensaje, 'error');
        } else if (err.status === 400) {
          Swal.fire('Error de credenciales', 'Username o password incorrectos!', 'error');
        }
        this.cargando = false;
        console.log(err);
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'Debe indicar su nombre de usuario y contraseña'
      });
    }
  }

  startApp(): void {
    this.authService.startUpGoogleSignIn().then((auth2: any) => {
      this.attachSignin(document.getElementById('customBtn'), auth2);
    });
  }

  attachSignin(element, auth2): void {
    auth2.attachClickHandler(element, {},
        (googleUser) => this.onSuccess(googleUser),
        (error) => this.onFailure(error));
  }

  onSuccess(googleUser): void {
    this.zone.run(() => {
      this.cargando = true;
      const tokenId = googleUser.getAuthResponse().id_token;

      this.authService.googleSignIn(tokenId).subscribe((resp: any) => {
        this.authService.guardarDatosSesion(resp.token);
        this.authService.paginaInicio();
        this.cargando = false;
      }, err => {
        if (err.status === 404 || err.status === 500) {
          Swal.fire('Error', err.error.mensaje, 'error');
        } else if (err.status === 400) {
          Swal.fire('Error de credenciales', err.error.mensaje, 'error');
        }
        this.cargando = false;
        console.log(err);
      });
    });
  }

  onFailure(error): void {
    console.log(error);
  }

}
