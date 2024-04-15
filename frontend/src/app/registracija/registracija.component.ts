import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    this.oznacen = null;
  }

  lozinka: string;
  korisnik: Korisnik;
  poruka: string;

  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);
    this.korisnik = null;
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

  nazad(){
    this.ruter.navigate(['']);
  }

  kor_ime: string;
  ime: string;
  prezime: string;
  potvrda: string;
  telefon: string;
  mejl: string;
  tip: string;
  naziv: string;
  adresa: string;
  maticni_broj: string;
  opis: string;
  slika: string;
  

  oznacen: File;
  image: File;

  oznaciFajl(event){
   // alert("!");
    this.oznacen = <File>event.target.files[0];
    const reader = new FileReader();
    reader.onload = ()=>{
      //alert("!");
      this.slika = <string>reader.result; 
    //   var img = new Image();
    // img.src = this.slika;
    // if(img.width >300 || img.width <100 || img.height >300 || img.height < 100){
    //   this.poruka = "minimalna velicina slike mora biti 100*100px, a maksimalna 300*300px";
    //   this.slika = null;
    //   return;
    // }      
    };
    reader.readAsDataURL(this.oznacen);
  }


  registracija(){

    //provera da li su popunjena obavezna polja
    if(!this.kor_ime || !this.lozinka || !this.potvrda || !this.telefon || !this.mejl || !this.tip){
      this.poruka = "Popunite sva obavezna polja!"
      return;

    }
    //provera lozinke

    if(!this.proveraLozinke()){
      return;
    }

    if(!this.proveraMejla()){
      return;
    }

    if(!this.proveraTelefona()){
      return;
    }
    if(this.lozinka != this.potvrda){
      this.poruka = "Lozinka i potvrda lozinke se razlikuju!";
      return;
    }
   
//obavezna polja za odredjeni tip korisnika
    if(this.tip == "klijent"){
      if(!this.ime || !this.prezime){
        this.poruka = "Popunite sva obavezna polja za klijenta! *(Ime i prezime)"
        return;
      }
    }else if(this.tip == "agencija"){
      if(!this.adresa || !this.naziv || !this.opis || !this.maticni_broj){
        this.poruka = "Popunite sva obavezna polja za agenciju! *(Adresa, opis, naziv i maticni broj)"
        return;
      }
      if(!this.proveraBroja()){ return;}

      
    }

    //DODAVANJE SLIKEE
    if(this.slika!=null){
    var img = new Image();
    img.src = this.slika;
    if(img.width >300 || img.width <100 || img.height >300 || img.height < 100){
      this.poruka = "minimalna velicina slike mora biti 100*100px, a maksimalna 300*300px";
      return;
    } 
  }
    //provera zauzetosti korimena i mejla
    this.korisnikServis.korImeZauzeto(this.kor_ime).subscribe((res)=>{
      if(res['message'] == 'nije'){
        this.poruka = "Korisnicko ime vec postoji!";
        return;

      }else {
        this.korisnikServis.mejlZauzet(this.mejl).subscribe((res)=>{
          if(res['message'] == 'nije'){
            this.poruka = "Nalog sa ovim mejlom vec postoji. Molimo vas da koristite drugi mejl!";
            return;
          }else { //i korime i mejl su jedinstveni
            this.korisnikServis.dodajZahtev(this.ime, this.prezime, this.kor_ime, this.lozinka, this.tip, this.mejl, this.telefon,
               this.naziv,this.adresa, this.maticni_broj, this.opis, this.slika).subscribe((res) => {
                if(res['message'] == "Zahtev je dodat!"){
                  //alert('Zahtev poslat!');
                  this.korisnikServis.dodaj(this.kor_ime, this.mejl).subscribe((r)=>{
                    if(r['message'] == "Dodato!"){
                     // alert("okej");
                    }else alert("Greska pri cuvanju!");
                  })
                  localStorage.clear();
                  this.ruter.navigate(['']);
                } else alert('Greska pri slanju zahteva!');
               })
          }
        })
      }
    })

    
  }

}
