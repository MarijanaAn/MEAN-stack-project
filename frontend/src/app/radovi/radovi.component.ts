import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Prostorija } from '../models/prostorija';
import { Korisnik } from '../models/korisnik';
import { Objekat } from '../models/objekat';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';
import { Radnik } from '../models/radnik';
import { Posao } from '../models/posao';

@Component({
  selector: 'app-radovi',
  templateUrl: './radovi.component.html',
  styleUrls: ['./radovi.component.css']
})
export class RadoviComponent implements OnInit {
  @ViewChild('canvas', {static: true}) myCanvas!: ElementRef;

  constructor(private korisnikServis: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    this.posao = JSON.parse(localStorage.getItem('radovi'));
this.objekat = this.posao.objekat;

    if(this.korisnik.tip == "agencija"){
      if(this.posao.radnici.length == 0){
      this.korisnikServis.dohvatiSlobodneRadnike(this.korisnik.kor_ime).subscribe((r: Radnik[])=>{
        this.slobodni = r;
        this.napraviKanvas();
      })
    }
else{
 // this.korisnikServis.zavrsiSobu(this.objekat._id, 2).subscribe((o: Objekat)=>{})
 this.izmeneNaKanvasu();
}
  }
  if(this.korisnik.tip == "klijent" || this.korisnik.tip == "admin"){
this.izmeneNaKanvasu();
  }
   // this.napraviKanvas();
  }
  korisnik: Korisnik;
  objekat: Objekat;
  slobodni: Radnik[];
  posao: Posao;
  radnik: Radnik;
  soba: number;
  radnici: Radnik[] = [];
  dodati: boolean;
  razlog: string;

  dodajRadnike(){
    this.radnici = [];
    for(let i = 0; i< this.slobodni.length; i++){
      if(this.slobodni[i].cekiran){
        this.radnici.push(this.slobodni[i]);
      }
    }
    if(this.radnici.length < this.objekat.broj_prostorija){
      this.poruka = "Morate uneti minimum " + this.objekat.broj_prostorija + " radnika";
      this.radnici = [];
      return;
    }
    this.poruka = "";
    for(let j = 0; j < this.radnici.length; j++){
      this.korisnikServis.zauzetostRadnika(this.radnici[j]._id, true).subscribe((r)=>{
         })
    }
    this.korisnikServis.dodajRadnikeNaPosao(this.posao._id, this.radnici).subscribe((r)=>{//alert("Radnici su dodati!")
    this.posao.radnici = this.radnici;
      localStorage.clear();
    localStorage.setItem('ulogovan', JSON.stringify(this.korisnik));
    localStorage.setItem('radovi', JSON.stringify(this.posao));
    this.ngOnInit();});
  

  }
  gotoveSobe: number = 0;
  
  izmeneNaKanvasu(){
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, 250, 250);
      if(context){
        this.gotoveSobe = 0;
        for(let i = 0; i < this.objekat.skica.length; i++){
          if(i >= this.objekat.broj_prostorija){
            context.fillStyle='rgb(150, 75, 0)';
            context.fillRect(this.objekat.skica[i].x, this.objekat.skica[i].y, this.objekat.skica[i].duzina, this.objekat.skica[i].sirina);
          }else {
            if(this.objekat.skica[i].zapoceta && this.objekat.skica[i].zavrsena){
              context.fillStyle='rgb(0, 255, 0)';
              this.gotoveSobe++;
            }else if(this.objekat.skica[i].zapoceta){
             // alert(this.objekat.skica[i].id)
              context.fillStyle='rgb(255, 0, 0)';
            }else {context.fillStyle='rgb(255, 255, 255)';
          }
              context.fillRect(this.objekat.skica[i].x, this.objekat.skica[i].y, this.objekat.skica[i].duzina, this.objekat.skica[i].sirina);
            context.strokeRect(this.objekat.skica[i].x, this.objekat.skica[i].y, this.objekat.skica[i].duzina, this.objekat.skica[i].sirina);
          }
        }
      }
  }

  zapocniSobu(){
    if(this.soba == 3){
      this.korisnikServis.zapocniSobu(this.objekat._id, 3).subscribe((r)=>{
        this.korisnikServis.dohvatiObjekatPoid(this.objekat._id).subscribe((o: Objekat)=>{
          this.posao.objekat = o;
          localStorage.clear();
            localStorage.setItem('ulogovan', JSON.stringify(this.korisnik));
          localStorage.setItem('radovi', JSON.stringify(this.posao));
          this.ngOnInit();
        })
      })
    }
    else if(this.soba == 2){
        this.korisnikServis.zapocniSobu(this.objekat._id, 2).subscribe((r)=>{
          this.korisnikServis.dohvatiObjekatPoid(this.objekat._id).subscribe((o: Objekat)=>{
            this.posao.objekat = o;
            localStorage.clear();
            localStorage.setItem('ulogovan', JSON.stringify(this.korisnik));
            localStorage.setItem('radovi', JSON.stringify(this.posao));
            this.ngOnInit();
          })
        })
    }else {
      this.korisnikServis.zapocniSobu(this.objekat._id, 1).subscribe((r)=>{
        this.korisnikServis.dohvatiObjekatPoid(this.objekat._id).subscribe((o: Objekat)=>{
          this.posao.objekat = o;
          //alert(this.posao.objekat.broj_prostorija);
          
          localStorage.clear();
            localStorage.setItem('ulogovan', JSON.stringify(this.korisnik));
          localStorage.setItem('radovi', JSON.stringify(this.posao));
          this.ngOnInit();
        })
      })
    }
  }

  soba2: number;
  zavrsiSobu(){
    if(this.soba2 == 3){
    if(!this.objekat.skica[2].zapoceta){
      this.poruka = "Soba mora biti zapoceta";
      return;
    }
    this.korisnikServis.zavrsiSobu(this.objekat._id, 3).subscribe((o: Objekat)=>{
      this.posao.objekat = o;
      localStorage.clear();
        localStorage.setItem('ulogovan', JSON.stringify(this.korisnik));
      localStorage.setItem('radovi', JSON.stringify(this.posao));
      this.ngOnInit();
  })
  }
  else if(this.soba2 == 2){
      if(!this.objekat.skica[1].zapoceta){
        this.poruka = "Soba mora biti zapoceta";
        return;
      }
      console.log("??");
      this.korisnikServis.zavrsiSobu(this.objekat._id, 2).subscribe((o: Objekat)=>{
          this.posao.objekat = o;
          localStorage.clear();
            localStorage.setItem('ulogovan', JSON.stringify(this.korisnik));
          localStorage.setItem('radovi', JSON.stringify(this.posao));
          this.ngOnInit();
      })
  }else {
    if(!this.objekat.skica[0].zapoceta){
      this.poruka = "Soba mora biti zapoceta";
      return;
    }
    this.korisnikServis.zavrsiSobu(this.objekat._id, 1).subscribe((o: Objekat)=>{
     // alert(o.adresa);
     // alert(o.skica[0].zavrsena);
      this.posao.objekat = o;
      localStorage.clear();
        localStorage.setItem('ulogovan', JSON.stringify(this.korisnik));
      localStorage.setItem('radovi', JSON.stringify(this.posao));
      this.ngOnInit();
  })
  }
  }


  napraviKanvas(){
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, 250, 250);
      if(context){
        this.#nacrtajSkicu(context);
      }
  }

  nazad(){
    localStorage.clear();
    localStorage.setItem('ulogovan', JSON.stringify(this.korisnik));
    this.ruter.navigate(['poslovi']);
  }


  #nacrtajSkicu(context: CanvasRenderingContext2D){
    for(let i = 0; i < this.objekat.skica.length; i++){
      if(i >= this.objekat.broj_prostorija){
        context.fillStyle='rgb(150, 75, 0)';
        context.fillRect(this.objekat.skica[i].x, this.objekat.skica[i].y, this.objekat.skica[i].duzina, this.objekat.skica[i].sirina);
      }else {
        if(this.slobodni.length >= this.objekat.broj_prostorija){
          this.posao.nedovoljno = false;
          this.korisnikServis.azurirajNedovoljnoRadnika(this.posao._id, this.posao.nedovoljno).subscribe((r)=>{});
          context.fillStyle='rgb(255, 255, 255)';
          context.fillRect(this.objekat.skica[i].x, this.objekat.skica[i].y, this.objekat.skica[i].duzina, this.objekat.skica[i].sirina);
        context.strokeRect(this.objekat.skica[i].x, this.objekat.skica[i].y, this.objekat.skica[i].duzina, this.objekat.skica[i].sirina);
        }else {
          context.fillStyle='rgb(255, 255, 0)';
          this.posao.nedovoljno = true;
          this.korisnikServis.azurirajNedovoljnoRadnika(this.posao._id, this.posao.nedovoljno).subscribe((r)=>{});
          
context.fillRect(this.objekat.skica[i].x, this.objekat.skica[i].y, this.objekat.skica[i].duzina, this.objekat.skica[i].sirina);
context.strokeRect(this.objekat.skica[i].x, this.objekat.skica[i].y, this.objekat.skica[i].duzina, this.objekat.skica[i].sirina);  
this.poruka = "Trenutno nema dovoljno slobodnih radnika";
}
      }

    }
   }

  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);
    this.korisnik = null;
  }
  prostorije: Prostorija[] = [];
  poruka: string;
  broj: number;

  plati(){
    this.korisnikServis.zavrsiPosao(this.posao._id).subscribe((r)=>{
      //alert("Uspesno ste platili!");
      this.poruka  = "Uspesno ste platili";
      this.korisnikServis.dodajRadnikeNaPosao(this.posao._id, null).subscribe((r)=>{
        for(let j = 0; j < this.radnici.length; j++){
          this.korisnikServis.zauzetostRadnika(this.radnici[j]._id, false).subscribe((r)=>{
            //alert("Promenjeno!");
            this.ngOnInit();
          })
        }
      })
      this.korisnikServis.vratiObjekatNaInic(this.posao.objekat._id, 1).subscribe((r)=>{})
      this.korisnikServis.vratiObjekatNaInic(this.posao.objekat._id, 2).subscribe((r)=>{})
      this.korisnikServis.vratiObjekatNaInic(this.posao.objekat._id, 3).subscribe((r)=>{})
      this.ruter.navigate(['poslovi']);
    })
   // this.ruter.navigate(['poslovi']);
  }


  otkazi(){
    if(this.razlog!=null){
this.korisnikServis.zahtevZaOtkazivanje(this.posao._id, this.razlog).subscribe((r)=>{
  this.razlog = null;
  this.poruka = "Uspesno ste poslali zahtev za otkazivanje";
})
    }else this.poruka = "Niste uneli razlog otkazivanja";
  }
}

