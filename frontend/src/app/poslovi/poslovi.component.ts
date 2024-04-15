import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Posao } from '../models/posao';
import { Objekat } from '../models/objekat';

@Component({
  selector: 'app-poslovi',
  templateUrl: './poslovi.component.html',
  styleUrls: ['./poslovi.component.css']
})
export class PosloviComponent implements OnInit {
  @ViewChildren('canvas') myCanvas: QueryList<ElementRef>;

  constructor(private korisnikServis: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    if(this.korisnik.tip == "klijent") this.klijent = true;
    else if(this.korisnik.tip == "agencija") this.agencija = true;
    else this.admin = true;
  if(this.klijent){
this.korisnikServis.dohvatiPosloveKlijenta(this.korisnik.kor_ime).subscribe((p: Posao[])=>{
this.poslovi = p;
for(let i=0; i<this.poslovi.length; i++){
  this.korisnikServis.dohvatiKorisnika(this.poslovi[i].agencija).subscribe((k: Korisnik)=>{
this.poslovi[i].agencija = k;
  this.korisnikServis.dohvatiObjekatPoid(this.poslovi[i].objekat).subscribe((o: Objekat)=>{
    this.poslovi[i].objekat = o;
    if(this.poslovi[i].status=="aktivan"){this.aktivni.push(this.poslovi[i])}
  else if(this.poslovi[i].status=="zavrsen"){this.zavrseniP.push(this.poslovi[i])}
  })})
  // this.korisnikServis.dohvatiAgenc(this.poslovi[i].agencija).subscribe((k:Korisnik)=>{
  //   this.poslovi[i].agencija = k;
  // })
  
}
})
this.korisnikServis.dohvatiZahteveKlijenta(this.korisnik.kor_ime).subscribe((p:Posao[])=>{
  this.zahteviK = p;
  for(let i=0; i<this.zahteviK.length; i++){
    if(this.zahteviK[i].zahtev == "prihvacen")this.zahteviK[i].prihvacen = true;
    else this.zahteviK[i].prihvacen=false;
    this.korisnikServis.dohvatiObjekatPoid(this.zahteviK[i].objekat).subscribe((o: Objekat)=>{
      this.zahteviK[i].objekat = o;
    })
    this.korisnikServis.dohvatiKorisnika(this.zahteviK[i].agencija).subscribe((k:Korisnik)=>{
      this.zahteviK[i].agencija = k;
    })
  }
})

  }
  if(this.agencija){
    this.korisnikServis.dohvatiZahteveAgencije(this.korisnik.kor_ime).subscribe((p:Posao[])=>{
      this.poslovi= p;
      for(let i=0; i<this.poslovi.length; i++){
        //this.poslovi[i].ponuda = 0;
        this.korisnikServis.dohvatiKorisnika(this.poslovi[i].klijent).subscribe((k:Korisnik)=>{
          this.poslovi[i].klijent = k;
          //alert(this.poslovi[i].klijent.ime);
        })
          this.korisnikServis.dohvatiObjekatPoid(this.poslovi[i].objekat).subscribe((o: Objekat)=>{
            this.poslovi[i].objekat = o;
          })
      }
    })
    this.korisnikServis.aktivniPoslovi(this.korisnik.kor_ime).subscribe((a:Posao[])=>{
      this.aktivni = a;
      for(let i=0; i<this.aktivni.length; i++){
        this.korisnikServis.dohvatiObjekatPoid(this.aktivni[i].objekat).subscribe((o: Objekat)=>{
          this.aktivni[i].objekat = o;
         // this.napraviKanvas(this.aktivni[i].objekat);
        })
        this.korisnikServis.dohvatiKorisnika(this.aktivni[i].klijent).subscribe((k:Korisnik)=>{
          this.aktivni[i].klijent = k;
        })
    }
    })
  }

  if(this.admin){
    this.korisnikServis.dohvatiPoslove().subscribe((p: Posao[])=>{
      this.poslovi = p;
      for(let i=0; i<this.poslovi.length; i++){
        this.korisnikServis.dohvatiKorisnika(this.poslovi[i].agencija).subscribe((a: Korisnik)=>{
          this.poslovi[i].agencija = a;
          this.korisnikServis.dohvatiKorisnika(this.poslovi[i].klijent).subscribe((k: Korisnik)=>{
            this.poslovi[i].klijent = k;
        this.korisnikServis.dohvatiObjekatPoid(this.poslovi[i].objekat).subscribe((o: Objekat)=>{
          this.poslovi[i].objekat = o;
          if(this.poslovi[i].status=="aktivan"){this.aktivni.push(this.poslovi[i])}
        else if(this.poslovi[i].status=="zavrsen"){this.zavrseniP.push(this.poslovi[i])}
        else if(this.poslovi[i].status=="ponuda"){this.ponude.push(this.poslovi[i])}
        else if(this.poslovi[i].status=="zahtev za saradnju"){this.zahteviSaradnja.push(this.poslovi[i])}
        else if(this.poslovi[i].status=="otkazan"){this.otkazani.push(this.poslovi[i])}
        })
      })
    })
      }
    })
    this.korisnikServis.dohvatiZahteveZaOtkazivanje().subscribe((z: Posao[])=>{
      this.zahteviOtkazivanje = z;
      for(let i = 0; i < this.zahteviOtkazivanje.length; i++){
        this.korisnikServis.dohvatiKorisnika(this.zahteviOtkazivanje[i].agencija).subscribe((a: Korisnik)=>{
          this.zahteviOtkazivanje[i].agencija = a;
          this.korisnikServis.dohvatiKorisnika(this.zahteviOtkazivanje[i].klijent).subscribe((k: Korisnik)=>{
            this.zahteviOtkazivanje[i].klijent = k;
            this.korisnikServis.dohvatiObjekatPoid(this.zahteviOtkazivanje[i].objekat).subscribe((o: Objekat)=>{
              this.zahteviOtkazivanje[i].objekat = o;
            })
          })
        })
      }
    })
  }

  }

  napraviKanvas(objekat: Objekat) {
    this.myCanvas.forEach((stavka)=>{
      const canvas: HTMLCanvasElement = stavka.nativeElement;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, 250, 250);
      if(context){
        for(let i = 0; i < objekat.skica.length; i++){
          if(i >= objekat.broj_prostorija){
            context.fillStyle='rgb(150, 75, 0)';
            context.fillRect(objekat.skica[i].x, objekat.skica[i].y, objekat.skica[i].duzina, objekat.skica[i].sirina);
          }else {
            context.strokeRect(objekat.skica[i].x, objekat.skica[i].y, objekat.skica[i].duzina, objekat.skica[i].sirina);
          }
    
        }
  
      }
    })
  }

  zahteviOtkazivanje: Posao[] = [];

  zahteviK: Posao[] = [];
  prihvacen: boolean[];

  aktivni: Posao[] = [];
  zavrseniP: Posao[] = [];
  ponude: Posao[] = [];
  zahteviSaradnja: Posao[] = [];
  otkazani: Posao[] =[];
  korisnik: Korisnik;
  klijent: boolean;
  agencija: boolean;
  admin: boolean;
  poslovi: Posao[] =[];
  objekti: Objekat[ ]= [];
  ponuda: number;

  zavrseni: boolean;
  aktivnic: boolean;
  zahtevi: boolean;
  ponudec: boolean;
  otkazanic: boolean;

  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);
    this.korisnik = null;
  }
  poruka: string;

  prihvatiZahtev(z: Posao, i){
    this.poruka = "";
    if(z.ponuda > 0 ){
      this.korisnikServis.prihvatiZahtev(z._id, z.ponuda).subscribe((resp)=>{
        //alert("Ponuda je prihvacena!");
        this.ngOnInit();
        this.ponuda = null;
      })
    }
    else{
     // alert("Morate uneti ponudu pre prihvatanja!");
      this.poruka = "Ponuda mora biti pozitivna vrednost!";
    }
  }

  ostaviRecenziju(agencija){
    localStorage.setItem('agencija', JSON.stringify(agencija));
    this.ruter.navigate(['ostavirecenziju']);
  }

  pogledajRecenziju(z: Posao){
    localStorage.setItem('posaorecenzija', JSON.stringify(z));
    this.ruter.navigate(['ostavirecenziju']);
  }

  


  odbijZahtev(z: Posao){
    this.korisnikServis.odbijZahtev(z._id).subscribe((resp)=>{
      //alert("Zahtev odbijen!");
      this.poruka = "Uspesno ste odbili zahtev";
      this.ngOnInit();
    })
  }

  prihvatiPonudu(z: Posao){
    this.korisnikServis.prihvatiPonudu(z._id).subscribe((r)=>{
      //alert("Ponuda prihvacena!");
      this.poruka = "Uspesno ste prihvatili ponudu";
      this.ngOnInit();
    })
  }

  odbijPonudu(z: Posao){
    this.korisnikServis.odbijPonudu(z._id).subscribe((r)=>{
      //alert("Ponuda odbijena!");
      this.poruka = "Uspesno ste odbili ponudu";
      this.ngOnInit();
    })
  }

  pogledaj(o: Posao){
    localStorage.setItem('radovi', JSON.stringify(o));
    this.ruter.navigate(['radovi']);
  }

  prihvatiOtkazivanje(z: Posao){
    this.korisnikServis.otkaziPosao(z._id).subscribe((r)=>{
      this.ngOnInit();
    })
  }

  odbijOtkazivanje(z: Posao){
    this.korisnikServis.odbijOtkazivanjePosla(z._id).subscribe((r)=>{
      this.ngOnInit();
    })
  }

  pogledajSkicu(o: Objekat){
    localStorage.setItem('objekat', JSON.stringify(o));
    this.ruter.navigate(['skica']);
  }
  

}
