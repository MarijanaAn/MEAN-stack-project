import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KlijentComponent } from './klijent/klijent.component';
import { AgencijaComponent } from './agencija/agencija.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { LozinkaComponent } from './lozinka/lozinka.component';
import { ProfilComponent } from './profil/profil.component';
import { ObjektiComponent } from './objekti/objekti.component';
import { AdminpocetnaComponent } from './adminpocetna/adminpocetna.component';
import { AzuriranjeComponent } from './azuriranje/azuriranje.component';
import { DodajComponent } from './dodaj/dodaj.component';
import { AgencijekComponent } from './agencijek/agencijek.component';
import { PosloviComponent } from './poslovi/poslovi.component';
import { RadniciComponent } from './radnici/radnici.component';
import { RecenzijeComponent } from './recenzije/recenzije.component';
import { SaradnjaComponent } from './saradnja/saradnja.component';
import { OstavirecenzijuComponent } from './ostavirecenziju/ostavirecenziju.component';
import { SkicaComponent } from './skica/skica.component';
import { RadoviComponent } from './radovi/radovi.component';


@NgModule({
  declarations: [
    AppComponent,
    KlijentComponent,
    AgencijaComponent,
    AdministratorComponent,
    PrijavaComponent,
    RegistracijaComponent,
    PocetnaComponent,
    LozinkaComponent,
    ProfilComponent,
    ObjektiComponent,
    AdminpocetnaComponent,
    AzuriranjeComponent,
    DodajComponent,
    AgencijekComponent,
    PosloviComponent,
    RadniciComponent,
    RecenzijeComponent,
    SaradnjaComponent,
    OstavirecenzijuComponent,
    SkicaComponent,
    RadoviComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
