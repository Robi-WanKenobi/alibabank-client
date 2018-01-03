import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../usuario.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sona-cliente',
  templateUrl: './sona-cliente.component.html',
  styleUrls: ['./sona-cliente.component.css']
})
export class SonaClienteComponent implements OnInit {

  credit: number;
  usuario: any;

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUser(this.route.snapshot.params['id']);
  }

  getUser(id) {
    this.usuarioService.getUsuario(id).then((res) => {
      this.usuario = res;
      this.credit = res['credito'];
    }, (err) => {
      console.log(err);
    });
  }
}
