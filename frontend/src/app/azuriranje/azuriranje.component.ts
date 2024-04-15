import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-azuriranje',
  templateUrl: './azuriranje.component.html',
  styleUrls: ['./azuriranje.component.css']
})
export class AzuriranjeComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private ruter : Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
if(this.korisnik.tip== "admin") this.admin= true;
this.a = JSON.parse(localStorage.getItem('azuriraj'));
if(this.a.tip == "agencija") this.agencija=true;
    if(this.a.tip =="klijent") this.klijent = true;
  }

  korisnik: Korisnik;
  a: Korisnik;
  admin:boolean;
  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);
    this.korisnik = null;
  }

  agencija: boolean = false;
  klijent: boolean = false;
  ime: string;
  prezime: string;
  mejl: string;
  telefon: string;
  poruka: string;

  proveraMejla(): boolean{
    var prom = /^\w{3,}@\w+\.\w{2,3}$/;
    if(!prom.test(this.mejl)){
      this.poruka = "Neodgovarajuci format mejla!";
        return false;
    }
    this.poruka = null;
      return true;
    }
    
    proveraTelefona(): boolean{
      var prom = /^[0-9]{10}$/;
    if(!prom.test(this.telefon)){
      this.poruka = "Neodgovarajuci broj telefona!";
        return false;
    }
    this.poruka = null;
      return true;
    }

    proveraBroja(): boolean{
      var prom = /^[0-9]{6,}$/;
    if(!prom.test(this.maticni_broj)){
      this.poruka = "Maticni broj mora zadrzati bar 6 cifara";
        return false;
    }
    this.poruka = null;
      return true;
    }

    naziv: string;
  adresa: string;
  opis: string;
  maticni_broj: string;
  korime: string;
  slika: string;

  oznacen: File;

  oznaciFajl(event){
  this.oznacen = <File>event.target.files[0];
  const reader = new FileReader();
  reader.onload = ()=>{
    this.slika = <string>reader.result;

  };
  reader.readAsDataURL(this.oznacen);
}

  azurirajKlijenta(){
      if(this.ime!=null || this.prezime!=null || this.mejl!=null || this.telefon!=null || this.slika!=null){
        if(this.mejl!=null && !this.proveraMejla()){
          this.poruka = "Mejl nije u dobrom formatu!";
          return;
        }
        if(this.telefon!= null && !this.proveraTelefona()){
          this.poruka = "Telefon nije u dobrom formatu!";
          return;
        }

        // if(this.korime!= null && this.korime != this.a.kor_ime) {
        // this.korisnikServis.korImeZauzeto(this.korime).subscribe((resp)=>{
        //   if(resp['message'] == 'nije'){
        //     this.poruka = "Korisnicko ime vec postoji!";
        //     return;}
        //   })
        // }

        if(this.mejl !=null && this.mejl != this.a.mejl){
        this.korisnikServis.mejlZauzet(this.mejl).subscribe((res)=>{
          if(res['message'] == 'nije'){
            this.poruka = "Nalog sa ovim mejlom vec postoji. Molimo vas da koristite drugi mejl!";
            return;}
          }) 
        }
        if(this.slika!=null) {
          var img = new Image();
  img.src = this.slika;
  if(img.width >300 || img.width <100 || img.height >300 || img.height < 100){
    this.poruka = "minimalna velicina slike mora biti 100*100px, a maksimalna 300*300px";
    return;
  } 
        }

        //if(this.korime==null) this.korime = this.a.kor_ime;
        if(this.ime== null) this.ime = this.a.ime;
      if(this.prezime== null) this.prezime = this.a.prezime;
      if(this.mejl == null) this.mejl = this.a.mejl;
      if(this.telefon == null) this.telefon = this.a.telefon;
      if(this.slika == null) this.slika = this.a.slika;


        this.korisnikServis.azurirajKorisnika(this.a.kor_ime, this.ime, this.prezime, this.mejl, this.telefon, this.naziv, this.adresa, this.opis, this.maticni_broj, this.slika).subscribe((res)=>{
        this.korisnikServis.azurirajMejl(this.a.kor_ime, this.mejl).subscribe((r)=>{
          this.korisnikServis.dohvatiKorisnika(this.a.kor_ime).subscribe((k: Korisnik)=>{
            this.a = k;
        localStorage.clear();
        localStorage.setItem('ulogovan', JSON.stringify(this.korisnik));
        localStorage.setItem('azuriraj', JSON.stringify(this.a));
        this.korime = null;
        this.ime = null;
        this.prezime = null;
        this.mejl = null;
        this.telefon=null;
        this.slika = null;
        this.poruka = "Uspesno ste azurirali korisnika";
        //this.ruter.navigate(['adminpocetna']);
          })
        })
          })
        }
      else {
        this.poruka = "Morate uneti bar jedan podatak da biste uspesno azurirali korisnika";
        return;
      }
  }

  azurirajAgenciju(){
    if(this.naziv!=null || this.opis!=null || this.adresa!=null || this.mejl!=null || this.telefon!=null || !this.slika!= null || this.maticni_broj!=null){
      if(this.mejl!=null && !this.proveraMejla()){
        this.poruka = "Mejl nije u dorbom formatu!";
        return;
      }
      if(this.telefon!= null && !this.proveraTelefona()){
        this.poruka = "Telefon nije u dobrom formatu!";
        return;
      }

      if(this.maticni_broj!= null && !this.proveraBroja()){
        this.poruka = "Maticni broj mora imati bar 6 cifara!";
        return;
      }
      // if(this.korime != this.a.kor_ime) {
      //   this.korisnikServis.korImeZauzeto(this.korime).subscribe((resp)=>{
      //     if(resp['message'] == 'nije'){
      //       this.poruka = "Korisnicko ime vec postoji!";
      //       return;}
      //     })
      //   }

        if(this.mejl!=null && this.mejl != this.a.mejl){
        this.korisnikServis.mejlZauzet(this.mejl).subscribe((res)=>{
          if(res['message'] == 'nije'){
            this.poruka = "Nalog sa ovim mejlom vec postoji. Molimo vas da koristite drugi mejl!";
            return;}
          }) 
        }

        if(this.slika!=null) {
          var img = new Image();
  img.src = this.slika;
  if(img.width >300 || img.width <100 || img.height >300 || img.height < 100){
    this.poruka = "minimalna velicina slike mora biti 100*100px, a maksimalna 300*300px";
    return;
  } 
        }
        if(this.naziv== null) this.naziv = this.a.naziv;
      if(this.opis== null) this.opis = this.a.opis;
      if(this.adresa== null) this.adresa = this.a.adresa;
      if(this.maticni_broj== null) this.maticni_broj = this.a.maticni_broj;
      if(this.mejl == null) this.mejl = this.a.mejl;
      if(this.telefon == null) this.telefon = this.a.telefon;
      if(this.slika == null) this.slika = this.a.slika;
      
            this.korisnikServis.azurirajKorisnika(this.a.kor_ime, this.ime, this.prezime, this.mejl, this.telefon, this.naziv, this.adresa, this.opis, this.maticni_broj, this.slika).subscribe((res)=>{
              this.korisnikServis.azurirajMejl(this.a.kor_ime, this.mejl).subscribe((r)=>{
                this.korisnikServis.dohvatiKorisnika(this.a.kor_ime).subscribe((k: Korisnik)=>{
                  this.a = k;
              localStorage.clear();
              localStorage.setItem('ulogovan', JSON.stringify(this.korisnik));
              localStorage.setItem('azuriraj', JSON.stringify(this.a));
              this.slika = null;
              this.naziv = null;
              this.opis = null
              this.adresa = null;
              this.mejl = null;
              this.telefon=null;
              this.maticni_broj = null;
              //this.ruter.navigate(['adminpocetna']);
              this.poruka = "Uspesno ste azurirali korisnika";
              })
            })
          })
      
    }else {
      this.poruka = "Unesite podatke koje zelite da azurirate";
      return;
    }
  }
  

}
