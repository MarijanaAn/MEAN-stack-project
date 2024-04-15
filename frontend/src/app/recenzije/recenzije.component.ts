import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';
import { Recenzije } from '../models/recenzije';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-recenzije',
  templateUrl: './recenzije.component.html',
  styleUrls: ['./recenzije.component.css']
})
export class RecenzijeComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
this.agencija = JSON.parse(localStorage.getItem('agencija'));
    this.korisnikServis.dohvatiRecenzije(this.agencija.kor_ime).subscribe((r: Recenzije[])=>{
      this.recenzije = r;
      for(let i = 0; i <this.recenzije.length; i++){
        this.korisnikServis.dohvatiKorisnika(this.recenzije[i].klijent).subscribe((k: Korisnik)=>{
          this.recenzije[i].klijent = k;
        })
      }
    })

  }

  korisnik: Korisnik;
  recenzije: Recenzije[];
  agencija: Korisnik;

  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);
    this.korisnik = null;
  }

  nazad(){
    if(this.korisnik == null){
      this.ruter.navigate(['']);
    }
    else this.ruter.navigate(['agencijek']);
  }
}
