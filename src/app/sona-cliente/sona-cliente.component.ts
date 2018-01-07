import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import {UsuarioService} from '../usuario.service';
import {ActivatedRoute} from '@angular/router';
import * as bigInt from 'big-integer';
import * as cryptoJS from 'crypto-js';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-sona-cliente',
  templateUrl: './sona-cliente.component.html',
  styleUrls: ['./sona-cliente.component.css']
})
export class SonaClienteComponent implements OnInit {

  length = 512;
  random_moneda: any;
  moneda_blinded: any;
  e: any;
  n: any;
  blinder: any;
  inv_blinder: any;
  b: any;
  credit: number;
  _valor: number;
  usuario: any;
  usuario_id: any;
  user_id: any;
  server_id: any;
  coin_signed: any;
  norep: any;
  suficiente: string;
  moneda_lista: string;

  @ViewChild('qrcode') el: ElementRef;

  constructor(private usuarioService: UsuarioService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getKeys();
    this.getUser(this.route.snapshot.params['id']);
  }

  getKeys() {
    this.usuarioService.getServerKeys().then((res) => {
      this.e = res['e'];
      this.n = res['n'];
      this.server_id = res['id'];
      this.createBlinderKeys(this.e, this.n);
    }, (err) => {
      console.log(err);
    });
  }

  createBlinderKeys(e, n) {
    this.b = bigInt.randBetween(bigInt(2).pow(this.length / 2), bigInt(n)).toString();
    console.log(this.b);
    while (!(bigInt(this.b).isPrime()) && (bigInt.lcm(bigInt(this.b), n) !== bigInt(1))) {
      this.b = bigInt.randBetween(bigInt(2).pow(this.length / 2), bigInt(n)).toString();
    }
    console.log(this.b);

    this.blinder = bigInt(this.b).modPow(e, n);
    console.log('Factor de cegado: ' + this.blinder.toString());
    this.inv_blinder = bigInt(this.b).modInv(n);
    console.log('Factor de descegado: ' + this.inv_blinder.toString());
  }


  createRandomMoneda(valor) {
    if (this.credit < valor) {
      this.suficiente = 'no';
      setTimeout(() => {this.suficiente = ''; }, 1000);
    }else {
      this.random_moneda = bigInt.randBetween(bigInt(2).pow((this.length / 4) - 1), bigInt(2).pow(this.length / 4).minus(1));
      console.log('Moneda: ' + this.random_moneda.toString());
      this.blindMoneda(this.random_moneda, this.blinder, this.n, valor);
    }
  }

  blindMoneda(moneda, blinder, n, valor) {
    this.moneda_blinded = (bigInt(moneda).multiply(blinder)).mod(n);
    this.buildData(this.moneda_blinded, this.user_id, this.server_id, valor);
  }

  buildData(moneda, source, destination, valor) {
    // CryptoJS.SHA256(JSON.stringify(data)).toString(CryptoJS.enc.Hex);
    // console.log("Hash: " + norep);
    const data = ([{'A': source}, {'B': destination}, {'coin': moneda.toString()}, {'cantidad': valor}]);
    this.norep = cryptoJS.SHA256(JSON.stringify(data)).toString(cryptoJS.enc.Hex);
    const _data = ([{'A': source}, {'B': destination}, {'coin': moneda.toString()}, {'cantidad': valor}, {'Po': this.norep}]);
    console.log(_data);
    this.usuarioService.signCoin(_data).then((res) => {
      // (bigInt(signed_final_blind).multiply(b_inv)).mod($scope.modN);
      console.log(res[2].signed);
      this.coin_signed = (bigInt(res[2].signed).multiply(this.inv_blinder)).mod(this.n).toString(16);
      console.log('Moneda firmada: ' + this.coin_signed);
      this._valor = valor;

      this.moneda_lista = 'yes';

    }, (err) => {
      console.log(err);
    });
  }

  getMoneda() {
    this.credit = this.credit - this._valor;
    this.usuarioService.updateCredit(this.usuario_id, {'credito': this.credit}).then(() => {
      const doc = new jsPDF();

      doc.setFontSize(8);
      doc.output()
      doc.text('Anonycoin con identificador:', 10, 10);
      doc.text(this.coin_signed, 10, 16);
      doc.addHTML(this.el.nativeElement, 60, 25, null, () => {
        doc.save(this.coin_signed + '.pdf');
      });

      setTimeout(() => {this.moneda_lista = ''; }, 1000);
    }, (err) => {
      console.log(err);
    });
  }

  getUser(id) {
    this.usuarioService.getUsuario(id).then((res) => {
      this.usuario = res;
      this.credit = res['credito'];
      this.user_id = res['nombre'];
      this.usuario_id = res['_id'];
    }, (err) => {
      console.log(err);
    });
  }
}
