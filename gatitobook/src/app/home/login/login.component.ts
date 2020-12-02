import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario = 'www';
  senha = '';

  constructor() {}

  ngOnInit(): void {}

  login() {
    console.log(this.usuario);
    console.log(this.senha);
  }
}
