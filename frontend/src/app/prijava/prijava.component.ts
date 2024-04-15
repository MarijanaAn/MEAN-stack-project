import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
  }

  kor_ime: string;
  lozinka: string;

  poruka: string;
  korisnik:Korisnik;

  odjava(){
    localStorage.clear();
    this.router.navigate(['']);
    this.korisnik = null;
  }

  prijava(){
    this.korisnikServis.prijava(this.kor_ime, this.lozinka).subscribe((korisnik: Korisnik)=>{
      if(korisnik!=null){
        localStorage.setItem('ulogovan', JSON.stringify(korisnik));
        if(korisnik.tip=='agencija'){
          this.router.navigate(['agencija']);
        } else if(korisnik.tip == 'klijent'){
          this.router.navigate(['klijent']);
        } 
        else if(korisnik.tip == 'admin'){
          this.poruka = "Na ovom mestu se ne mozete prijaviti kao admin";
          return;
        }else {
          this.poruka = "Nepoznati tip korisnika!";
          return;
        }
      } else {
        this.poruka = 'Greska! Korisnik ne postoji!';
        return;
      }
    })
  }

}
