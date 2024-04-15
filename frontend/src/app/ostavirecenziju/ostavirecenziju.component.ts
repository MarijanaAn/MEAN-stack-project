import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';
import { Recenzije } from '../models/recenzije';
import { Posao } from '../models/posao';

@Component({
  selector: 'app-ostavirecenziju',
  templateUrl: './ostavirecenziju.component.html',
  styleUrls: ['./ostavirecenziju.component.css']
})
export class OstavirecenzijuComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    if(this.korisnik.tip == "klijent"){
    this.agencija = JSON.parse(localStorage.getItem('agencija'));
    this.korisnikServis.dohvatiRecenzijuKorisnika(this.korisnik.kor_ime, this.agencija).subscribe((r: Recenzije)=>{
      this.recenzija = r;
    })
  }
  if(this.korisnik.tip == "admin"){
    this.posao = JSON.parse(localStorage.getItem('posaorecenzija'));
    this.korisnikServis.dohvatiRecenzijuKorisnika(this.posao.klijent, this.posao.agencija).subscribe((r: Recenzije)=>{
      this.recenzija = r;
    })
  }


  }

  posao : Posao;
  korisnik: Korisnik;
  agencija: string;
  recenzija: Recenzije;

  ocena: number;
  komentar: string;
  poruka: string;

  dodajRecenziju(){
    if(this.ocena!=null && this.komentar!=null){
      if(this.ocena>5 || this.ocena<1){
        this.poruka="Ocena mora biti u opsegu 1-5";
        return;
      }
      this.korisnikServis.dodajRecenziju(this.korisnik.kor_ime, this.agencija, this.komentar, this.ocena).subscribe((res)=>{
      if(res['message']== "Ostavljena!"){
        //alert("Ostavili ste recenziju!");
        this.poruka = "Ostavili ste recenziju";
        this.ocena = null;
        this.komentar = null;
        this.ngOnInit();
      }
      else {this.poruka = "Doslo je do greske";}
      })

    }else {
      this.poruka = "Unesite sva polja!";
      return;
    }
  }

  obrisi(){
    this.korisnikServis.obrisiRecenziju(this.korisnik.kor_ime, this.agencija).subscribe((r)=>{
      //alert("Obrisana!");
      //this.poruka = "Obrisali ste recenziju";
      this.ngOnInit();
    })
  }

  azuriraj: boolean;

  azurirajRecenziju(){
    if(this.ocena!=null && this.komentar!=null){
      this.korisnikServis.azurirajRecenziju(this.korisnik.kor_ime, this.agencija, this.komentar, this.ocena).subscribe((r)=>{
        this.ngOnInit();
        this.azuriraj = false;
        this.ocena = null;
        this.komentar = null;
      })
    }else {
      this.poruka = "Unesite oba polja!"
      return;
    }
  }




  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);
    this.korisnik = null;
  }
}
