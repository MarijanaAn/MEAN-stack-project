import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private router: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    if(this.korisnik.tip == "agencija") this.agencija=true;
    if(this.korisnik.tip =="klijent") this.klijent = true;
  }

  korisnik: Korisnik;
  agencija: boolean;
  klijent: boolean = false;
  ime: string;
  prezime: string;
  mejl: string;
  telefon: string;
  slika: string;
  poruka: string;
  korime: string;

  oznacen: File;

    oznaciFajl(event){
    this.oznacen = <File>event.target.files[0];
    const reader = new FileReader();
    reader.onload = ()=>{
      this.slika = <string>reader.result;

    };
    reader.readAsDataURL(this.oznacen);
  }

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

  azurirajKlijenta(){
    if(this.korime!=null || this.ime!=null || this.prezime!=null || this.mejl!=null || this.telefon!=null || this.slika!=null){
      if(this.mejl!=null && !this.proveraMejla()){
        return;
      }
      if(this.telefon!=null && !this.proveraTelefona()){
        return;
      }
      if(this.mejl!=null && this.mejl != this.korisnik.mejl){
      this.korisnikServis.mejlZauzet(this.mejl).subscribe((res)=>{
        if(res['message'] == 'nije'){
          this.poruka = "Nalog sa ovim mejlom vec postoji. Molimo vas da koristite drugi mejl!";
          return;}
        })
      }

      if(this.korime!= null && this.korime != this.korisnik.kor_ime) {
        this.korisnikServis.korImeZauzeto(this.korime).subscribe((resp)=>{
          if(resp['message'] == 'nije'){
            this.poruka = "Korisnicko ime vec postoji!";
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
        if(this.korime==null) this.korime = this.korisnik.kor_ime;
        if(this.mejl==null) this.mejl = this.korisnik.mejl;
      if(this.ime== null) this.ime = this.korisnik.ime;
      if(this.prezime== null) this.prezime = this.korisnik.prezime;
      if(this.telefon == null) this.telefon = this.korisnik.telefon;
      if(this.slika == null) this.slika = this.korisnik.slika;
      
          
      this.korisnikServis.azurirajKlijenta(this.korisnik.kor_ime, this.korime, this.ime, this.prezime, this.mejl, this.telefon, this.slika).subscribe((re)=>{
        this.korisnikServis.azurirajKorimeIMejl(this.korisnik.kor_ime,this.korime, this.mejl).subscribe((r)=>{
          this.korisnikServis.azurirajRecenzijeKlijenta(this.korisnik.kor_ime, this.korime).subscribe((resp)=>{
            this.korisnikServis.azurirajObjekteKlijenta(this.korisnik.kor_ime, this.korime).subscribe((resp)=>{
              this.korisnikServis.azurirajPosloveKlijenta(this.korisnik.kor_ime, this.korime).subscribe((resp)=>{
        this.korisnikServis.dohvatiKorisnika(this.korime).subscribe((k: Korisnik)=>{
              this.korisnik = k;
              localStorage.clear();
              localStorage.setItem('ulogovan', JSON.stringify(this.korisnik));
             // this.ngOnInit();
             this.korime = null;
              this.ime = null;
              this.prezime = null;
              this.mejl = null;
              this.telefon=null;
              this.slika = null;
              this.ngOnInit();
              this.poruka = "Podaci su uspesno azurirani";
                })
              })
              })
              })
              })
            })
          
        
    }else {
      this.poruka = "Morate uneti bar jedan podatak";
      return;
    }
  }

  naziv: string;
  adresa: string;
  opis: string;

  azurirajAgenciju(){
    if(this.naziv!=null || this.opis!=null || this.adresa!=null || this.mejl!=null || this.telefon!=null || this.slika){
      if(this.mejl!= null && !this.proveraMejla()){
        // this.poruka = "Mejl nije u dorbom formatu!";
        return;
      }
      if(this.telefon!= null && !this.proveraTelefona()){
        // this.poruka = "Telefon nije u dobrom formatu!";
        return;
      }

      if(this.mejl!=null && this.mejl != this.korisnik.mejl){
        this.korisnikServis.mejlZauzet(this.mejl).subscribe((res)=>{
          if(res['message'] == 'nije'){
            this.poruka = "Nalog sa ovim mejlom vec postoji. Molimo vas da koristite drugi mejl!";
            return;}
          })
        }
  
        if(this.korime!= null && this.korime != this.korisnik.kor_ime) {
          this.korisnikServis.korImeZauzeto(this.korime).subscribe((resp)=>{
            if(resp['message'] == 'nije'){
              this.poruka = "Korisnicko ime vec postoji!";
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
          if(this.korime== null) this.korime = this.korisnik.kor_ime;
          if(this.naziv== null) this.naziv = this.korisnik.naziv;
      if(this.opis== null) this.opis = this.korisnik.opis;
      if(this.adresa== null) this.adresa = this.korisnik.adresa;
      if(this.mejl == null) this.mejl = this.korisnik.mejl;
      if(this.telefon == null) this.telefon = this.korisnik.telefon;
      if(this.slika == null) this.slika = this.korisnik.slika;
      
      // this.korisnikServis.mejlZauzet(this.mejl).subscribe((res)=>{
      //   if(res['message'] == 'nije'){
      //     this.poruka = "Nalog sa ovim mejlom vec postoji. Molimo vas da koristite drugi mejl!";
      //     return;}
      //     else{
            this.korisnikServis.azurirajAgenciju(this.korisnik.kor_ime, this.korime, this.naziv, this.adresa, this.opis, this.mejl, this.telefon, this.slika).subscribe((res)=>{
              this.korisnikServis.azurirajKorimeIMejl(this.korisnik.kor_ime,this.korime, this.mejl).subscribe((r)=>{
              this.korisnikServis.azurirajPosloveAgencije(this.korisnik.kor_ime, this.korime).subscribe((resp)=>{
                this.korisnikServis.azurirajRecenzijeAgencije(this.korisnik.kor_ime, this.korime).subscribe((resp)=>{
              this.korisnikServis.azurirajRadnikeAgencije(this.korisnik.kor_ime, this.korime).subscribe((resp)=>{
                
                this.korisnikServis.dohvatiKorisnika(this.korisnik.kor_ime).subscribe((k: Korisnik)=>{
                  this.korisnik = k;
                  localStorage.clear();
              localStorage.setItem('ulogovan', JSON.stringify(this.korisnik));
              this.korime = null;
              this.naziv = null;
              this.opis = null
              this.adresa = null;
              this.mejl = null;
              this.telefon=null;
              this.poruka = "Korisnik je uspesno azuriran";
                })
            })
          })
        })
      })
    })
          
        //})
    }else {
      this.poruka = "Unesite podatke koje zelite da azurirate";
      return;
    }
  }

  odjava(){
    localStorage.clear();
    this.router.navigate(['']);
    this.korisnik = null;
  }

}
