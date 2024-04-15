import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-lozinka',
  templateUrl: './lozinka.component.html',
  styleUrls: ['./lozinka.component.css']
})
export class LozinkaComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    if(this.korisnik.tip == "agencija") this.agencija=true;
    if(this.korisnik.tip =="klijent") this.klijent = true;
  }

  agencija: boolean;
  klijent: boolean;
korisnik: Korisnik;

  lozinka: string = "";
  poruka: string;
  stara: string;
  potvrda: string;

  kor_ime: string = "";


  promeniLozinku(){
    if(!this.kor_ime || !this.stara || !this.lozinka || !this.potvrda){
      this.poruka = "Popunite sva polja!";
      return ;
    }
    if(this.kor_ime != this.korisnik.kor_ime){
      this.poruka="Neispravno uneto korisnicko ime!";
      return;
    }
    if(this.stara != this.korisnik.lozinka){
      this.poruka = "Neispravno uneta stara lozinka!";
    }
    if(this.proveraLozinke()){
      if(this.lozinka != this.potvrda){
        this.poruka = "Lozinka i potvrda lozinke se razlikuju!";
        return;
      }else {
        this.korisnikServis.promeniLozinku(this.kor_ime, this.stara, this.lozinka).subscribe((k: Korisnik)=>{
          console.log("Lozinka je uspesno promenjena!");
          if(this.korisnik.tip == "admin"){
            localStorage.clear();
            this.korisnik = null;
            this.ruter.navigate(['admin']); 
          }else {
            localStorage.clear();
            this.korisnik = null;
            this.ruter.navigate(['prijava']); 
          }
        })
      }
    }else return;
      


  }

  odjava(){
    localStorage.clear();
    this.korisnik = null;
    this.ruter.navigate(['']); 
  }

  proveraLozinke() : boolean{
    //provera duzine
    if(this.lozinka.length<7 || this.lozinka.length>12){
      this.poruka = "Neodgovarajuca lozinka! Duzina lozinke mora biti izmedju 7 i 12 karaktera!";
      return false;
    }
    //provera velikog slova
    var veliko = /(?:[A-Z].*){1,}/;
    if(!veliko.test(this.lozinka)){
      this.poruka = "Neodgovarajuca lozinka! Lozinka mora da sadrzi barem jedno veliko slovo!";
      return false;
    }
    //provera broja
    var broj = /(?:\d.*){1,}/;
    if(!broj.test(this.lozinka)){
      this.poruka = "Neodgovarajuca lozinka! Lozinka mora da sadrzi barem jednu cifru!";
      return false;
    }

    //provare specijalnog karaktera
    var spec = /(?:\W.*){1,}/;
    if(!spec.test(this.lozinka)){
      this.poruka = "Neodgovarajuca lozinka! Lozinka mora da sadrzi barem jedan specijalni karakter";
      return false;
    }

    //provera da li pocinje slovom
    var pocinje = /^[a-zA-Z].{1,}$/;
    if(!pocinje.test(this.lozinka)){
      this.poruka = "Neodgovarajuca lozinka! Lozinka mora da pocinje slovom!";
      return false;
    }

    //sve je provereno
    this.poruka = null;
    return true;
  }



}
