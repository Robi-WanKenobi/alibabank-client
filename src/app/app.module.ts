import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { InisioComponent } from './inisio/inisio.component';
import {RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {UsuarioService} from "./usuario.service";
import {HttpModule} from "@angular/http";
import { ChangeCoinsComponent } from './change-coins/change-coins.component';
import { SonaClienteComponent } from './sona-cliente/sona-cliente.component';
import { PirfilClienteComponent } from './pirfil-cliente/pirfil-cliente.component';

const ROUTES = [
  { path: '', redirectTo: 'inisio', pathMatch: 'full' },
  { path: 'inisio', component: InisioComponent},
  { path: 'login', component: LoginComponent},
  { path: 'sona-cliente/:id', component: SonaClienteComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    InisioComponent,
    LoginComponent,
    ChangeCoinsComponent,
    SonaClienteComponent,
    PirfilClienteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [UsuarioService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
