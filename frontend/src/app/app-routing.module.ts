import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';

import { RegistracijaComponent } from './registracija/registracija.component';
import { KlijentComponent } from './klijent/klijent.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { AgencijaComponent } from './agencija/agencija.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { ProfilComponent } from './profil/profil.component';
import { ObjektiComponent } from './objekti/objekti.component';
import { LozinkaComponent } from './lozinka/lozinka.component';
import { AdminpocetnaComponent } from './adminpocetna/adminpocetna.component';
import { DodajComponent } from './dodaj/dodaj.component';
import { AzuriranjeComponent } from './azuriranje/azuriranje.component';
import { AgencijekComponent } from './agencijek/agencijek.component';
import { PosloviComponent } from './poslovi/poslovi.component';
import { RadniciComponent } from './radnici/radnici.component';
import { RecenzijeComponent } from './recenzije/recenzije.component';
import { SaradnjaComponent } from './saradnja/saradnja.component';
import { OstavirecenzijuComponent } from './ostavirecenziju/ostavirecenziju.component';
import { SkicaComponent } from './skica/skica.component';
import { RadoviComponent } from './radovi/radovi.component';

const routes: Routes = [
  {path: '', component: PocetnaComponent},
  {path: 'prijava', component: PrijavaComponent},
  {path: 'registracija', component: RegistracijaComponent},
  {path: 'klijent', component: KlijentComponent},
  {path: 'admin', component: AdministratorComponent},
  {path: 'agencija', component: AgencijaComponent}, //dodaj sve nove komponente
  {path: 'profil', component: ProfilComponent},
  {path: 'objekti', component: ObjektiComponent},
  {path: 'lozinka', component: LozinkaComponent},
  {path: 'adminpocetna', component: AdminpocetnaComponent},
  {path: 'dodaj', component: DodajComponent},
  {path: 'azuriranje', component: AzuriranjeComponent},
  {path: 'agencijek', component: AgencijekComponent},
  {path: 'poslovi', component: PosloviComponent},
  {path: 'radnici', component: RadniciComponent},
  {path: 'recenzije', component: RecenzijeComponent},
  {path: 'saradnja', component: SaradnjaComponent},
  {path: 'ostavirecenziju', component: OstavirecenzijuComponent},
  {path: 'skica', component: SkicaComponent}, 
  {path: 'radovi', component: RadoviComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
