import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ScriptsService } from '../../services/scripts.service';
import { environment } from '../../../environments/environment';

import { faKey } from '@fortawesome/free-solid-svg-icons';
import { faSync } from '@fortawesome/free-solid-svg-icons';

declare const gapi: any;
declare const document: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public cargando: boolean;
  private auth2: any;

  public faKey = faKey;
  public faSync = faSync;

  constructor(private scriptsService: ScriptsService) {
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
    this.cargando = true;

    this.form.markAllAsTouched();
    setTimeout(() => this.cargando = false, 1200);
  }

  startApp(): void {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: environment.googleClientId,
        cookiepolicy: 'single_host_origin'
      });
      this.attachSignin(document.getElementById('customBtn'));
    });
  }

  attachSignin(element): void {
    this.auth2.attachClickHandler(element, {},
        (googleUser) => this.onSuccess(googleUser),
        (error) => this.onFailure(error));
  }

  onSuccess(googleUser): void {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    console.log(googleUser.getAuthResponse().id_token);
  }

  onFailure(error): void {
    console.log(error);
  }

  signOut(): void {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
    });
  }

}
