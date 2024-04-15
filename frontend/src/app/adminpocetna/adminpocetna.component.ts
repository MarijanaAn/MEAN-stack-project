import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';
import { Zahtev } from '../models/zahtev';
import { Korisnik } from '../models/korisnik';
import { Ids } from '../models/ids';

@Component({
  selector: 'app-adminpocetna',
  templateUrl: './adminpocetna.component.html',
  styleUrls: ['./adminpocetna.component.css']
})
export class AdminpocetnaComponent implements OnInit {

  constructor(private korisnikServis:KorisnikService, private ruter : Router) { }

  ngOnInit(): void {
this.korisnikServis.dohvatiZahteve().subscribe((z: Zahtev[])=>{
  this.zahtevi = z;
})
this.korisnikServis.dohvatiKlijente().subscribe((k: Korisnik[])=>{
  this.klijenti = k;
})
this.korisnikServis.dohvatiAgencije().subscribe((k: Korisnik[])=>{
  this.agencije = k;
})
this.korisnikServis.dohvatiKorisnike().subscribe((k: Korisnik[])=>{
  this.korisnici = k;
})
this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
if(this.korisnik.tip== "admin") this.admin= true;
  }

  zahtevi: Zahtev[]=[];
klijenti: Korisnik[] = [];
agencije: Korisnik[] = [];
korisnici: Korisnik[] = [];

kor_ime_zahtev: string;
poruka: string;
zahtev: Zahtev;
korisnik: Korisnik;
admin:boolean;

odjava(){
  localStorage.clear();
  this.ruter.navigate(['']);
  this.korisnik = null;
}

porukaZahtev: string;

prihvatiZahtev(z: Zahtev){

let k = new Korisnik();
k.ime = z.ime;
k.prezime = z.prezime;
k.kor_ime = z.kor_ime;
k.lozinka = z.lozinka;
k.slika = z.slika;
k.tip = z.tip;
k.naziv = z.naziv;
k.opis = z.opis;
k.adresa = z.adresa;
k.mejl =z.mejl;
k.telefon=z.telefon;
k.maticni_broj = z.maticni_broj;

this.korisnikServis.dodajKorisnika(k.ime, k.prezime, k.kor_ime, k.lozinka, k.tip, k.mejl, k.telefon, k.naziv, k.adresa, k.maticni_broj, k.opis, k.slika).subscribe((res)=>{
     if(res["message"]== "Korisnik je dodat!"){
      //alert("Korisnik je dodat!");
      //this.korisnikServis.incKorisnike(this.ids.korisnici).subscribe((resp)=>{});
      this.porukaZahtev = "Korisnik je uspesno dodat";
      this.odbaciZahtev(z);
        }
          else {this.porukaZahtev = "Doslo je do greske prilikom prihvatanja zahteva!";
        }
  })
    
}

odbaciZahtev(z: Zahtev){
this.korisnikServis.obrisiZahtev(z.kor_ime).subscribe((r)=>{
//alert("obrisan!");
//this.porukaZahtev = "Uspesno ste odbacili zahtev";
// this.korisnikServis.dohvatiZahteve().subscribe((zah: Zahtev[])=>{
//   this.zahtevi = zah;
// })
this.ngOnInit();
})
}

obrisiKorisnika(k: Korisnik){
  this.korisnikServis.obrisiKorisnika(k.kor_ime).subscribe((resp)=>{
   // alert("obrisan!");
   if(k.tip=="agencija"){
    this.korisnikServis.obrisiPosloveAgencije(k.kor_ime).subscribe((resp)=>{
      this.korisnikServis.obrisiRadnikeAgencije(k.kor_ime).subscribe((resp)=>{
        this.korisnikServis.obrisiRecenzijeAgencije(k.kor_ime).subscribe((resp)=>{
          console.log("Sve je obrisano");
        })
      })
    })
   }else if(k.tip=="Klijent"){
    this.korisnikServis.obrisiPosloveKlijenta(k.kor_ime).subscribe((resp)=>{
      this.korisnikServis.obrisiObjekteKlijenta(k.kor_ime).subscribe((resp)=>{
        this.korisnikServis.obrisiRecenzijeKlijenta(k.kor_ime).subscribe((resp)=>{
          console.log("Sve je obrisano");
        })
      })
    })
   }
   this.poruka = "Uspesno ste obrisali korisnika";
    this.ngOnInit();
  })
}

azurirajKorisnika(k: Korisnik){
  localStorage.setItem('azuriraj', JSON.stringify(k));
  this.ruter.navigate(['azuriranje']);
}

radnici(agencija: Korisnik){
  localStorage.setItem('radnici', JSON.stringify(agencija));
  this.ruter.navigate(['radnici']);
}

}

