import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agencija',
  templateUrl: './agencija.component.html',
  styleUrls: ['./agencija.component.css']
})
export class AgencijaComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
  }
  korisnik: Korisnik;
  dodatno: number;

  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);
    this.korisnik = null;
  }
  poruka: string;

  posaljiZahtev(){
    if(this.dodatno > 0){
      this.korisnikServis.zahtevDodatnaMesta(this.korisnik.kor_ime, this.dodatno).subscribe((r)=>{
        this.korisnikServis.dohvatiKorisnika(this.korisnik.kor_ime).subscribe((k: Korisnik)=>{
          this.korisnik = k;
          localStorage.clear();
          localStorage.setItem('ulogovan', JSON.stringify(this.korisnik));
          this.poruka = "Uspesno ste poslali zahtev";
        this.dodatno = null;
        this.ngOnInit();
        })
      })
    }else {
      this.poruka = "Broj dodatnih mesta mora biti pozitivan";
    }
  }

}
