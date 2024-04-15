import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';
import { Objekat } from '../models/objekat';
import { Prostorija } from '../models/prostorija';

@Component({
  selector: 'app-skica',
  templateUrl: './skica.component.html',
  styleUrls: ['./skica.component.css']
})
export class SkicaComponent implements OnInit {
  @ViewChild('canvas', {static: true}) myCanvas!: ElementRef;

  constructor(private korisnikServis: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    this.objekat = JSON.parse(localStorage.getItem('objekat'));
    this.napraviKanvas();
  }
  korisnik: Korisnik;
  objekat: Objekat;


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
    if(this.korisnik.tip == "klijent"){
    this.ruter.navigate(['objekti']);
    }
    else if(this.korisnik.tip == "admin"){
      this.ruter.navigate(['poslovi']);
    }
  }

  #nacrtajSkicu(context: CanvasRenderingContext2D){
    for(let i = 0; i < this.objekat.skica.length; i++){
      if(i >= this.objekat.broj_prostorija){
        context.fillStyle='rgb(150, 75, 0)';
        context.fillRect(this.objekat.skica[i].x, this.objekat.skica[i].y, this.objekat.skica[i].duzina, this.objekat.skica[i].sirina);
      }else {
        context.strokeRect(this.objekat.skica[i].x, this.objekat.skica[i].y, this.objekat.skica[i].duzina, this.objekat.skica[i].sirina);
      }

    }
   }

  odjava(){
    localStorage.clear();
    this.ruter.navigate(['']);
    this.korisnik = null;
  }

  duzina1: number;
  sirina1: number;
  duzina2: number;
  sirina2: number;
  duzina3: number;
  sirina3: number;

  duzina:number[];

  prostorije: Prostorija[] = [];
  poruka: string;
  broj: number;
  kvadratura:number;

  dodajProstorije(): boolean{
    this.kvadratura = 0;
    this.prostorije = [];
    if(this.broj >3){
      this.poruka = "Maksimalan broj prostorija je 3";
      return false;
    }
    if(this.broj <1){
      this.poruka = "Morate imati bar jednu prostoriju";
      return false;
    }

    if(this.duzina1<0 || this.sirina1 <0 || this.duzina2<0 || this.sirina2 <0 ||
      this.duzina3<0 || this.sirina3 <0 ){
          this.poruka = "Dimenzije moraju biti pozitivne vrednosti";
          return false;
        }
        if(this.duzina3> this.duzina1 && this.sirina1 < this.sirina2)
        {
          this.poruka = "Doslo je do preklapanja soba, dimenzije nisu dobre"; 
          return false;
        }
      this.poruka = "";
      if(this.duzina1 == null || this.sirina1==null) {
        this.poruka = "Morate uneti sve potrebne dimenzije";
        return false;
      }
   let p1 = new Prostorija();
   p1.x = 0;
   p1.y = 0;
   p1.duzina = this.duzina1 * 20;
   p1.sirina = this.sirina1 * 20;
   p1.zavrsena = false;
   p1.id = 1;
   this.kvadratura += this.duzina1 * this.sirina1;
   this.prostorije.push(p1);
   
   if(this.broj > 1) {
    if(this.duzina2 == null || this.sirina2==null) {
      this.poruka = "Morate uneti sve potrebne dimenzije";
      return false;
    }
      let p2 = new Prostorija();
      p2.x = this.duzina1 *20;
      p2.y = 0;
      p2.duzina = this.duzina2*20;
      p2.sirina = this.sirina2*20;
      p2.zavrsena = false;
      p2.id = 2;
      this.kvadratura += this.duzina2 * this.sirina2;
      this.prostorije.push(p2);
      }
      if(this.broj > 2) {
        if(this.duzina3 == null || this.sirina3==null) {
          this.poruka = "Morate uneti sve potrebne dimenzije";
          return false;
        }
      let p3 = new Prostorija();
      p3.x = 0;
      p3.y = this.sirina1 *20;
      p3.duzina = this.duzina3 *20;
      p3.sirina = this.sirina3*20;
      p3.zavrsena = false;
      p3.id = 3;
      this.kvadratura += this.duzina3 * this.sirina3;
      this.prostorije.push(p3);
      }

      this.kvadratura = Number(this.kvadratura.toFixed());

      let p4 = new Prostorija();
    p4.x = 30;
    p4.y = this.sirina1*20 -20;
    p4.duzina = 10;
    p4.sirina = 20;
    this.prostorije.push(p4);
   if(this.broj > 1) {
    let p5 = new Prostorija();
    p5.x = (this.duzina1+ this.duzina2)*20 -30;
    p5.y = this.sirina2*20 -20;
    p5.duzina = 10;
    p5.sirina = 20;
    this.prostorije.push(p5);

    let p = new Prostorija();
    p.x = (this.duzina1)*20;
    p.y = 30;
    p.duzina = 20;
    p.sirina = 10;
    this.prostorije.push(p);
  }
   if(this.broj > 2) {
    let p6 = new Prostorija();
    p6.x = 30;
    p6.y = this.sirina1*20 + this.sirina3*20 -20;
    p6.duzina = 10;
    p6.sirina = 20;
    this.prostorije.push(p6);
   }
   return true;
  }

  tip: string;
  adresa: string;

  predefinisanaSkica(){
    this.kvadratura = 0;
    this.prostorije = [];
    let p1 = new Prostorija();
    p1.x = 0;
    p1.y = 0;
    p1.duzina = 60;
    p1.sirina = 80;
    p1.id = 1;
    this.kvadratura += 12;
    this.prostorije.push(p1);
    if(this.broj>1){let p2 = new Prostorija();
    p2.x = 0;
    p2.y = 80;
    p2.duzina = 100;
    p2.sirina = 60;
    p2.id = 2;
    this.kvadratura += 15;
    this.prostorije.push(p2);}
    if(this.broj>2){
    let p3 = new Prostorija();
    p3.x = 60;
    p3.y = 0;
    p3.duzina = 90;
    p3.sirina = 80;
    this.kvadratura += 18;
    p3.id = 3;
    this.prostorije.push(p3);}
    let p4 = new Prostorija();
    p4.x = 30;
    p4.y = 60;
    p4.duzina = 10;
    p4.sirina = 20;
    this.prostorije.push(p4);
    if(this.broj>1){
    let p5 = new Prostorija();
    p5.x = 60;
    p5.y = 120;
    p5.duzina = 10;
    p5.sirina = 20;
    this.prostorije.push(p5);
  }
    if(this.broj>2){
    let p6 = new Prostorija();
    p6.x = 80;
    p6.y = 60;
    p6.duzina = 10;
    p6.sirina = 20;
    this.prostorije.push(p6);}
    
  }
 

  azuriraj(){
    if(this.tip!=null || this.adresa!=null || this.broj!=null){
      if( this.broj!=null){
        this.predefinisanaSkica();
      }
      
      if(this.tip ==null) this.tip = this.objekat.tip;
      if(this.adresa == null) this.adresa = this.objekat.adresa;
      if(this.broj == null) {this.broj = this.objekat.broj_prostorija;
        this.kvadratura = this.objekat.kvadratura;
        this.prostorije = this.objekat.skica;
    
        }
      this.korisnikServis.azurirajObjekat(this.objekat._id, this.tip, this.adresa, this.broj, this.kvadratura, this.prostorije).subscribe((r)=>{
       this.korisnikServis.dohvatiObjekatPoid(this.objekat._id).subscribe((o: Objekat)=>{
        this.objekat = o;
        localStorage.setItem('objekat', JSON.stringify(this.objekat));
        this.tip = null;
       this.adresa = null;
       this.broj = null;
       this.kvadratura = null;
       
        this.ngOnInit();
       })
      })
    }else this.poruka= "Morate uneti bar jedno polje koje zelite da azurirate!"
  }

}
