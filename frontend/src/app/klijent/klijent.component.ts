import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-klijent',
  templateUrl: './klijent.component.html',
  styleUrls: ['./klijent.component.css']
})
export class KlijentComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
  }

  korisnik: Korisnik;
  ime: string;
  prezime: string;
  mejl: string;
  telefon: string;
  poruka: string;


  odjava(){
    localStorage.clear();
    this.router.navigate(['']);
    this.korisnik = null;
  }
}
