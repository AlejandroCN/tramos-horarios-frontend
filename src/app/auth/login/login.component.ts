import { Component, OnInit } from '@angular/core';

import { ScriptsService } from '../../services/scripts.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private scriptsService: ScriptsService) { }

  ngOnInit(): void {
    this.scriptsService.load('google-platform').then(data => {
      this.renderButton();
    }).catch(error => console.log(error));
  }

  renderButton(): void {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: this.onSuccess,
      onfailure: this.onFailure
    });
  }

  onSuccess(googleUser): void {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
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
