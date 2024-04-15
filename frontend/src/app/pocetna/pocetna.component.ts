import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
this.korisnikServis.dohvatiAgencije().subscribe((a: Korisnik[])=>{
  this.agencije = a;
  this.nadjeno = a;
})
  }


  korisnik: Korisnik

  pretragaParam: string;
  agencije: Korisnik[]=[];
  nadjeno: Korisnik[]=[];
  tipSort: boolean=false;
  sortparam: string;

  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);
    this.korisnik = null;
  }

  pretraga(){
    this.nadjeno = this.agencije.filter(a=>a.naziv.includes(this.pretragaParam) || a.adresa.includes(this.pretragaParam)||
    a.naziv.toLowerCase().includes(this.pretragaParam) || a.adresa.toLowerCase().includes(this.pretragaParam) ||
    a.naziv.toUpperCase().includes(this.pretragaParam) || a.adresa.toUpperCase().includes(this.pretragaParam) );
  }

  adresa: boolean;
  naziv: boolean;

  // sortPoAdresi(): Korisnik[]{
  //   if(this.sortparam=="rastuce"){
    
  //   this.nadjeno.sort(function (a1, a2){
  //     if(a1.adresa < a2.adresa){
  //       return -1
  //     }else if(a1.adresa > a2.adresa){
  //       return 1
  //     }else return 0;
  //   })
  // }else {
  //   this.nadjeno.sort(function (a2, a1){
  //     if(a1.adresa < a2.adresa){
  //       return -1
  //     }else if(a1.adresa > a2.adresa){
  //       return 1
  //     }else return 0;
  //   })
  // }
  // return this.nadjeno;
  // }

  // sortPoNazivu(): Korisnik[]{//trebalo bi da radi
  //   if(this.sortparam == "rastuce"){
  //     this.nadjeno.sort(function (a1, a2){
  //       if(a1.naziv < a2.naziv){
  //         return -1;
  //       }else if(a1.naziv > a2.naziv){
  //         return 1;
  //       }else return 0;
  //     })
  //   } else{
  //     this.nadjeno.sort(function (a1, a2){
  //       if(a1.naziv > a2.naziv){
  //         return -1;
  //       }else if(a1.naziv < a2.naziv){
  //         return 1;
  //       }else return 0;
  //     })
  //   }
  // return this.nadjeno;
  // }

  sort(): Korisnik[]{
    if(this.naziv){
      if(this.sortparam == "rastuce"){
        this.nadjeno.sort(function (a1, a2){
          if(a1.naziv < a2.naziv){
            return -1;
          }else if(a1.naziv > a2.naziv){
            return 1;
          }else return 0;
        })
      } else{
        this.nadjeno.sort(function (a1, a2){
          if(a1.naziv > a2.naziv){
            return -1;
          }else if(a1.naziv < a2.naziv){
            return 1;
          }else return 0;
        })
      }
    }
    if(this.adresa){
      if(this.sortparam=="rastuce"){
    
        this.nadjeno.sort(function (a1, a2){
          if(a1.adresa < a2.adresa){
            return -1
          }else if(a1.adresa > a2.adresa){
            return 1
          }else return 0;
        })
      }else {
        this.nadjeno.sort(function (a2, a1){
          if(a1.adresa < a2.adresa){
            return -1
          }else if(a1.adresa > a2.adresa){
            return 1
          }else return 0;
        })
      }
    }
    if(this.naziv && this.adresa){
      if(this.sortparam=="rastuce"){
        this.nadjeno.sort(function (a1, a2){
            if(a1.naziv < a2.naziv) return -1;
            if(a1.naziv > a2.naziv) return 1;
            if(a1.adresa < a2.adresa)return -1;
            if(a1.adresa > a2.adresa)return 1;
            return 0;
        })
      }else {
        this.nadjeno.sort(function (a2, a1){
          if(a1.naziv < a2.naziv) return -1;
          if(a1.naziv > a2.naziv) return 1;
          if(a1.adresa < a2.adresa)return -1;
          if(a1.adresa > a2.adresa)return 1;
          return 0;
        })
      }
    }

    return this.nadjeno;
  }

  recenzije(agencija: Korisnik){
    localStorage.setItem('agencija', JSON.stringify(agencija));
    this.ruter.navigate(['recenzije']);
  }


}
