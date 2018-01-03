import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  constructor(private http: Http) { }

  Login(user) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/usuario/login', user)
        .map(res => {
          // If request fails, throw an Error that will be caught
          if (res.status === 500) {
            throw new Error('Error al inisiar sesión');
          }
          if (res.status === 404) {
            throw new Error('Incorrecto');
          }
          // If everything went fine, return the response
          if (res.status === 200) {
            return res.json();
          }
        })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  getUsuario(id) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/usuario/' + id)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res)
        }, (err) => {
          reject(err);
        });
    });
  }

}
