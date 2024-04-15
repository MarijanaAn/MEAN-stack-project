import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
  }

kor_ime: string;
lozinka: string;

poruka:string;
korisnik: Korisnik;


   prijava(){
    this.korisnikServis.prijava(this.kor_ime, this.lozinka).subscribe((korisnik: Korisnik)=>{
      if(korisnik!=null){
        
        if(korisnik.tip=='admin'){
          localStorage.setItem('ulogovan', JSON.stringify(korisnik));
          //dodaj na koju se stranicu ide
          this.router.navigate(['adminpocetna']);
        } else this.poruka = "Morate biti administrator!";
      } else {
        this.poruka = 'Greska! Korisnik ne postoji!';
      }
    })
  }
}
