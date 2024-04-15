import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Objekat } from '../models/objekat';

@Component({
  selector: 'app-saradnja',
  templateUrl: './saradnja.component.html',
  styleUrls: ['./saradnja.component.css']
})
export class SaradnjaComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    this.korisnikServis.dohvatiObjekte(this.korisnik.kor_ime).subscribe((o: Objekat[])=>{
      this.objekti = o;
    })
this.korisnikServis.dohvatiAgencije().subscribe((a: Korisnik[])=>{
  this.agencije = a;
})

  }

  korisnik: Korisnik;

agencije: Korisnik[] =[];
objekti: Objekat[] = [];

  agencija: string;
  klijent: string;
  objekat: string;
  vreme: number;

  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);
    this.korisnik = null;
  }

  poruka: string;

  traziSaradnju(){
    if(this.agencija!= null && this.objekat!=null && this.vreme!=null){
      if(this.vreme <= 0) {
        this.poruka = "Vreme mora biti pozitivna vrednost";
        return;
      }
      this.korisnikServis.traziSaradnju( this.korisnik.kor_ime, this.agencija, this.objekat, this.vreme).subscribe((res)=>{
        if(res['message']=="Zahtev je poslat!"){
          //alert("Zahtev je poslat!");
          //this.ruter.navigate(['agencijek']);
          this.poruka = "Zahtev je poslat agenciji. Dalje pracenje ove saradnje nastavite u sekciji Poslovi";
        }else this.poruka ="Doslo je do greske pri dodavanju!"; 
      })
    }else this.poruka = "Unesite sve podatke!" 
  }

  nazad(){
    this.ruter.navigate(['agencijek']);
  }
 

}
