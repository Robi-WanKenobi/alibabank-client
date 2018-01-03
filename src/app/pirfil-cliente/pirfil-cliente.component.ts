import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../usuario.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pirfil-cliente',
  templateUrl: './pirfil-cliente.component.html',
  styleUrls: ['./pirfil-cliente.component.css']
})
export class PirfilClienteComponent implements OnInit {

  usuario: any;

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUser(this.route.snapshot.params['id']);
  }

  getUser(id) {
    this.usuarioService.getUsuario(id).then((res) => {
      this.usuario = res;
    }, (err) => {
      console.log(err);
    });
  }
}
