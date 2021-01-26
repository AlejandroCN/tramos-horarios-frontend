import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ScriptsService } from '../../services/scripts.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService,
              private scriptsService: ScriptsService,
              private router: Router) { }

  ngOnInit(): void {
    this.scriptsService.load('google-platform').then(() => {
    }).catch(error => console.log(error));
  }

  async cerrarSesion(): Promise<any> {
    await this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

}
