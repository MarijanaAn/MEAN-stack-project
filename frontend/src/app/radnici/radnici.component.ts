import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';
import { Radnik } from '../models/radnik';
import { Ids } from '../models/ids';

@Component({
  selector: 'app-radnici',
  templateUrl: './radnici.component.html',
  styleUrls: ['./radnici.component.css']
})
export class RadniciComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    this.agen = JSON.parse(localStorage.getItem('radnici'));
    if(this.korisnik.tip=="agencija"){
    this.korisnikServis.dohvatiRadnike(this.korisnik.kor_ime).subscribe((r: Radnik[])=>{
this.radnici = r;
    })
  }else if(this.korisnik.tip=="admin"){
    this.korisnikServis.dohvatiRadnike(this.agen.kor_ime).subscribe((r: Radnik[])=>{
      this.radnici = r;
          })
  }
    this.korisnikServis.dohvatiRadnike(null).subscribe((r: Radnik[])=>{
      this.nedodeljeni = r;
    })
  }

  korisnik: Korisnik;
  radnici: Radnik[] = [];
  nedodeljeni: Radnik[] =[];
agen: Korisnik;

azuriraj: boolean;
dodaj: boolean;

  obrisiRadnika(r: Radnik){
    if(r.zauzet){
      this.poruka = "Ne mozete obrisati radnika dok je zauzet";
      return;
    }
    this.korisnikServis.obrisiRadnika(r._id).subscribe((r)=>{
      //alert("Radnik je obrisan!");
      this.poruka = "Uspesno ste obrisali radnika";
      this.ngOnInit();
    })
  }

  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);
    this.korisnik = null;
  }

  ime: string;
  prezime: string;
  mejl: string;
  telefon: string;
  specijalizacija: string;
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

  azurirajRadnika(r: Radnik){
    if(this.ime!=null || this.prezime!=null || this.mejl!=null || this.telefon!=null || this.specijalizacija!=null){
      if(this.mejl !=null && !this.proveraMejla()){
        return;
      }
  
      if(this.telefon!=null && !this.proveraTelefona()){
        return;
      }

      if(this.mejl!=null && this.mejl != r.mejl){
        this.korisnikServis.mejlZauzet(this.mejl).subscribe((res)=>{
          if(res['message'] == 'nije'){
            this.poruka = "Nalog sa ovim mejlom vec postoji. Molimo vas da koristite drugi mejl!";
            return;}
          })
        }
        if(this.ime == null) this.ime = r.ime;
        if(this.prezime == null) this.prezime = r.prezime;
        if(this.mejl == null) this.mejl = r.mejl;
        if(this.telefon == null) this.telefon = r.telefon;
        if(this.specijalizacija == null) this.specijalizacija = r.specijalizacija;


this.korisnikServis.azurirajStariMejl(r.mejl, this.mejl).subscribe((resp)=>{
      this.korisnikServis.azurirajRadnika(r._id, this.ime, this.prezime, this.mejl, this.telefon, this.specijalizacija).subscribe((r)=>{
        this.ime = null;
        this.prezime = null;
        this.mejl = null;
        this.telefon = null;
        this.specijalizacija = null;
        this.poruka = "Uspesno ste azurirali radnika";
        this.ngOnInit();
      })
    })
    
}
    else {
      this.poruka = "Unesite podatke koje zelite da izmenite";
      return;
    }
    
  }


  dodajRadnika(){
if(this.ime!= null && this.prezime!=null && this.mejl!=null && this.telefon!=null && this.specijalizacija!=null){
  if(!this.proveraMejla()){
    return;
  }

  if(!this.proveraTelefona()){
    return;
  }

  this.korisnikServis.mejlZauzet(this.mejl).subscribe((res)=>{
    if(res['message'] == 'nije'){
      this.poruka = "Nalog sa ovim mejlom vec postoji. Molimo vas da koristite drugi mejl!";
      return;}
      else{
          if(this.korisnik.tip == "admin"){
            this.korisnikServis.dodajRadnika(this.ime, this.prezime, this.mejl, this.telefon, this.specijalizacija, this.agen.kor_ime).subscribe((res)=>{
              if(res['message'] == "Radnik je dodat!"){
            this.korisnikServis.azurirajSlobodnaMesta(this.agen.kor_ime, this.agen.slobodno - 1).subscribe((r)=>{
              this.korisnikServis.dohvatiKorisnika(this.agen.kor_ime).subscribe((k: Korisnik)=>{
                this.agen = k;
                    localStorage.clear();
                    localStorage.setItem('ulogovan', JSON.stringify(this.korisnik));
                      localStorage.setItem('radnici', JSON.stringify(this.agen));
                      this.korisnikServis.dodaj(null, this.mejl).subscribe((r)=>{
                        if(r['message'] == "Dodato!"){
                          this.poruka = "Uspesno ste dodali radnika";
                          this.ime = null;
                          this.prezime = null;
                          this.mejl = null;
                          this.telefon =null;
                          this.specijalizacija = null;
                          this.ngOnInit();
                        }else this.poruka = "Doslo je do greske pri cuvanju podataka";
                      })
                     // this.ngOnInit();
                })
            })
          }
        })
          }else if(this.korisnik.tip == "agencija"){
            this.korisnikServis.dodajRadnika(this.ime, this.prezime, this.mejl, this.telefon, this.specijalizacija, this.korisnik.kor_ime).subscribe((res)=>{
              if(res['message'] == "Radnik je dodat!"){
              //  alert("Radnik je dodat!");
            this.korisnikServis.azurirajSlobodnaMesta(this.korisnik.kor_ime, this.korisnik.slobodno - 1).subscribe((r)=>{
              this.korisnikServis.dohvatiKorisnika(this.korisnik.kor_ime).subscribe((k: Korisnik)=>{
                this.korisnik = k;
               // alert("azurirana mesta i dohvacen korisnik");
                    localStorage.clear();
                    localStorage.setItem('ulogovan', JSON.stringify(this.korisnik));
                     // localStorage.setItem('radnici', JSON.stringify(this.agen));
                      this.korisnikServis.dodaj(null, this.mejl).subscribe((r)=>{
                        if(r['message'] == "Dodato!"){
                          //alert("mejl dodat");
                          this.poruka = "Uspesno ste dodali radnika";
                          this.ime = null;
                          this.prezime = null;
                          this.mejl = null;
                          this.telefon =null;
                          this.specijalizacija = null;
                          this.ngOnInit();
                        }else this.poruka = "Doslo je do greske pri cuvanju podataka";
                      })
                     // this.ngOnInit();
                })
            })
          }
        })
        }     
        }
    })      
}else {
  this.poruka = "Unesite sve podatke!";
}
  }

  // dodaj(id){ // zameni id sa _id
  //   this.korisnikServis.dodajRadnikaIzBaze(id, this.agen.kor_ime).subscribe((r)=>{
  //     this.ngOnInit();
  //   })
  // }

  prihvatiZahtev(){
    this.korisnikServis.prihvatiZahtevDodatnaMesta(this.agen.kor_ime, this.agen.dodatno).subscribe((r)=>{
      this.korisnikServis.dohvatiKorisnika(this.agen.kor_ime).subscribe((k: Korisnik)=>{
        this.agen = k;
        //alert(this.agen.kor_ime);
            localStorage.clear();
            localStorage.setItem('ulogovan', JSON.stringify(this.korisnik));
              localStorage.setItem('radnici', JSON.stringify(this.agen));
              this.ngOnInit();
        })
    })
  }

  odbaciZahtev(){
    this.korisnikServis.odbaciZahtevDodatnaMesta(this.agen.kor_ime).subscribe((r)=>{
      this.korisnikServis.dohvatiKorisnika(this.agen.kor_ime).subscribe((k: Korisnik)=>{
        this.agen = k;
            localStorage.clear();
            localStorage.setItem('ulogovan', JSON.stringify(this.korisnik));
              localStorage.setItem('radnici', JSON.stringify(this.agen));
              this.ngOnInit();
        })
    })
  }
}
