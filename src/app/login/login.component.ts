import { Component, OnInit } from '@angular/core';
import { UsuarioService} from "../usuario.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  password: string;
  status: string;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.usuarioService.Login({'usuario': this.usuario, 'password': this.password}).then((res) => {
      this.status = 'success';
      setTimeout(() => {this.status = ''; }, 1500);
      setTimeout(() => {this.router.navigate(['sona-cliente/' + res[`_id`]]); }, 1500);
    }, (err) => {
      console.log(err);
      this.status = 'error';
      setTimeout(() => {this.status = ''; }, 1500);
    });
  }

}
