import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../korisnik.service';
import { Router } from '@angular/router';
import { Objekat } from '../models/objekat';
import { Ids } from '../models/ids';
import { Prostorija } from '../models/prostorija';
import { Posao } from '../models/posao';
import { Radnik } from '../models/radnik';

@Component({
  selector: 'app-objekti',
  templateUrl: './objekti.component.html',
  styleUrls: ['./objekti.component.css']
})
export class ObjektiComponent implements OnInit {
  @ViewChild('canvas', {static: true}) myCanvas!: ElementRef;

  constructor(private korisnikServis: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    this.korisnikServis.dohvatiObjekte(this.korisnik.kor_ime).subscribe((o: Objekat[])=>{
      this.objekti = o;
    })
  }

napraviKanvas(){
  const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, 400, 400);
    if(context){
      this.#nacrtajSkicu(context);

    }
}



  objekti: Objekat[] = [];
  korisnik: Korisnik;

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

  kvadratura: number;
  

  #nacrtajSkicu(context: CanvasRenderingContext2D): boolean{
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
  

  //   if(this.duzina1<0 || this.sirina1 <0 || this.duzina2<0 || this.sirina2 <0 ||
  //   this.duzina3<0 || this.sirina3 <0 ){
  //       this.poruka = "Dimenzije moraju biti pozitivne vrednosti";
  //       return false;
  //     }
  //     if(this.duzina3> this.duzina1 && this.sirina1 < this.sirina2)
  //     {
  //       this.poruka = "Doslo je do preklapanja soba, dimenzije nisu dobre"; 
  //       return false;
  //     }
  //     this.poruka = "";
  //     if(this.duzina1 == null || this.sirina1==null) {
  //       this.poruka = "Morate uneti sve potrebne dimenzije";
  //       return false;
  //     }
  //   context.strokeRect(0, 0, this.duzina1 * 20, this.sirina1 *20);
  //   let p1 = new Prostorija();
  //   p1.x = 0;
  //   p1.y = 0;
  //   p1.duzina = this.duzina1 * 20;
  //   p1.sirina = this.sirina1 * 20;
  //   p1.zavrsena = false;
  //   p1.id = 1;
  //   this.kvadratura += this.duzina1 * this.sirina1;
  //   this.prostorije.push(p1);

  //   if(this.broj > 1) {
  //     if(this.duzina2 == null || this.sirina2==null) {
  //       this.poruka = "Morate uneti sve potrebne dimenzije";
  //       return false;
  //     }
  //   context.strokeRect(this.duzina1 *20, 0, this.duzina2 *20, this.sirina2*20);
  //   let p2 = new Prostorija();
  //   p2.x = this.duzina1 *20;
  //   p2.y = 0;
  //   p2.duzina = this.duzina2*20;
  //   p2.sirina = this.sirina2*20;
  //   p2.zavrsena = false;
  //   p2.id = 2;
  //   this.kvadratura += this.duzina2 * this.sirina2;
  //   this.prostorije.push(p2);
  //   }
  //   if(this.broj > 2) {
  //     if(this.duzina3 == null || this.sirina3==null) {
  //       this.poruka = "Morate uneti sve potrebne dimenzije";
  //       return false;
  //     }
  //   context.strokeRect(0, this.sirina1 *20, this.duzina3*20, this.sirina3*20);
  //   let p3 = new Prostorija();
  //   p3.x = 0;
  //   p3.y = this.sirina1 *20;
  //   p3.duzina = this.duzina3 *20;
  //   p3.sirina = this.sirina3*20;
  //   p3.zavrsena = false;
  //   p3.id = 3;
  //   this.kvadratura += this.duzina3 * this.sirina3;
  //   this.prostorije.push(p3);
  //   }

  //   this.kvadratura = Number(this.kvadratura.toFixed());
  //   //vrataaa
  //   context.fillStyle='rgb(150, 75, 0)';
  //   context.fillRect(30, this.sirina1*20 -20, 10, 20);
  //   let p4 = new Prostorija();
  //   p4.x = 30;
  //   p4.y = this.sirina1*20 -20;
  //   p4.duzina = 10;
  //   p4.sirina = 20;
  //   this.prostorije.push(p4);
  //  if(this.broj > 1) {context.fillRect(this.duzina1*20 + this.duzina2*20 -30, this.sirina2*20-20, 10, 20);
  //   let p5 = new Prostorija();
  //   p5.x = (this.duzina1+ this.duzina2)*20 -30;
  //   p5.y = this.sirina2*20 -20;
  //   p5.duzina = 10;
  //   p5.sirina = 20;
  //   this.prostorije.push(p5);

  //   context.fillRect(this.duzina1*20, 30, 20, 10);
  //   let p = new Prostorija();
  //   p.x = (this.duzina1)*20;
  //   p.y = 30;
  //   p.duzina = 20;
  //   p.sirina = 10;
  //   this.prostorije.push(p);
  // }
  //  if(this.broj > 2) {context.fillRect(30, this.sirina1*20 + this.sirina3*20-20, 10, 20);
  //   let p6 = new Prostorija();
  //   p6.x = 30;
  //   p6.y = this.sirina1*20 + this.sirina3*20 -20;
  //   p6.duzina = 10;
  //   p6.sirina = 20;
  //   this.prostorije.push(p6);
  //  }
   return true;
  }

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

  radnici: Radnik[] = [];
  poslovi: Posao[] = [];
  obrisi(o: Objekat){
    this.korisnikServis.obrisiObjekat(o._id).subscribe((r)=>{
      this.korisnikServis.dohvatiPosloveObjekta(o._id).subscribe((p: Posao[])=>{
this.poslovi = p;
for(let i = 0;i < this.poslovi.length; i++){
  if(this.poslovi[i].radnici!=null || this.poslovi[i].radnici.length>0 ){
    this.radnici = this.poslovi[i].radnici;
  for(let j = 0; j < this.radnici.length; j++){
    this.korisnikServis.zauzetostRadnika(this.radnici[j]._id, false).subscribe((r)=>{console.log("obrisan radnik")});
  }
}

  this.korisnikServis.odbijPonudu(this.poslovi[i]._id).subscribe((r)=>{console.log("Obrisan posao")});
}
      })
      this.ngOnInit();
    })
  }

  tip: string;
  adresa: string;
  broj: number;
  poruka: string;



  dodaj() {
    if(this.tip!=null && this.adresa!=null && this.broj!=null){
      if(this.broj >3){
        this.poruka = "Maksimalan broj prostorija je 3";
        return;
      }
      if(this.broj <1){
        this.poruka = "Morate imati bar jednu prostoriju";
        return;
      }
      this.predefinisanaSkica();
      
      this.korisnikServis.dodajObjekat(this.tip, this.adresa, this.broj, this.kvadratura, this.korisnik.kor_ime, this.prostorije).subscribe((res)=>{
        if(res['message'] == "Objekat je dodat!"){
        //alert("Uspesno ste dodali objekat");
        this.tip = null;
        this.adresa = null;
        this.broj = null;
        this.kvadratura = null;
        this.prostorije = [];
        this.ngOnInit();
        }
      })
    }else {
      this.poruka= "Unesite sva polja!";
    }
  }

  pogledaj(o: Objekat){
    localStorage.setItem('objekat', JSON.stringify(o));
    this.ruter.navigate(['skica']);
  }

  selectedFile: any;
  jsonObj:{tip: string, adresa: string, broj_prostorija: number}
 

  uploadFile(event){
    this.selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, "UTF-8");

    fileReader.onload =()=> {
      //console.log(fileReader.result.toString());
// this.jsonObj = (JSON.parse(fileReader.result.toString()));
// console.log(this.jsonObj[0]);
try{
  this.jsonObj = JSON.parse(fileReader.result.toString());

}catch(e){
  this.poruka = "Neispravan JSON fajl";
  this.selectedFile = null;
  this.jsonObj = null;
  return;
}
    }
    fileReader.onerror=(err)=>{
      console.log(err);
    }
  }

  preklapanje(p1: Prostorija, p2: Prostorija): boolean{
    if( p1.x < p2.x){
      if(p1.y < p2.y){
    if((p1.x + p1.duzina)> p2.x && (p1.y + p1.sirina)> p2.y)return true;
  }
else if(p1.y >= p2.y){
  if((p1.x + p1.duzina)> p2.x && (p2.y + p2.sirina)> p1.y)return true;
} }
    else if(p1.x >= p2.x){
      if(p1.y < p2.y){
      if((p2.x + p2.duzina)> p1.x && (p1.y + p1.sirina)> p2.y)return true;}
      else if(p1.y >= p2.y){
        //alert("2 vece");
        if((p2.x + p2.duzina)> p1.x && (p2.y + p2.sirina)> p1.y)return true;
      }
    }
    // if(p1.y < p2.y){
    //   //alert("Prvo vece");
    // if((p1.y + p1.sirina)> p2.y)return true;}
    // else if(p1.y > p2.y){
    //   //alert("2 vece");
    //   if((p2.y + p2.sirina)> p1.y)return true;
    // }
    return false;
  }

  dodirivanje(p1: Prostorija, p2: Prostorija): boolean{
    if((p1.x + p1.duzina) == p2.x || (p1.y + p1.sirina) == p2.y || p1.x == (p2.x + p2.duzina) || p1.y == (p2.y + p2.sirina)){
      return true;
    }else return false;
  }
  vrataUSobi(p: Prostorija, v: Prostorija): boolean{
    if((p.x == v.x && p.y<= v.y  && (p.y +p.sirina)>= (v.y + v.sirina)) ||
    (p.y == v.y && p.x <= v.x && (p.x +p.duzina)>= (v.x + v.duzina)) ||
    ((p.x + p.duzina) == (v.x + v.duzina) && p.y<= v.y && (p.y +p.sirina)>= (v.y + v.sirina)) ||
    ((p.y + p.sirina) == (v.y + v.sirina) && p.x <= v.x && (p.x +p.duzina)>= (v.x + v.duzina)) 
    )return true;
    return false;
  }


  dodajJSONObjekat(){
    if(this.jsonObj == null){
      this.poruka = "Niste izabrali JSON fajl!";
      return;
    }
    if(this.jsonObj[0].tip !=null && this.jsonObj[0].adresa!=null && this.jsonObj[0].broj_prostorija!=null 
     /* && this.jsonObj[0].skica!=null*/){
    if(this.jsonObj[0].tip!= "stan" && this.jsonObj[0].tip!="kuca"){
      this.poruka = "Tip objekta mora biti stan ili kuca!";
      return;
    }
    if(this.jsonObj[0].broj_prostorija>3 || this.jsonObj[0].broj_prostorija <1){
      this.poruka = "Morate imati 1-3 prostorija";
      return;
    }
    this.prostorije = [];

    // const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    // const context = canvas.getContext('2d');
    // context.clearRect(0, 0, 400, 400);
    // if(context){
    //   context.strokeRect(this.jsonObj[0].skica[0].x, this.jsonObj[0].skica[0].y, this.jsonObj[0].skica[0].duzina, this.jsonObj[0].skica[0].sirina);
    //   context.strokeRect(this.jsonObj[0].skica[1].x, this.jsonObj[0].skica[1].y, this.jsonObj[0].skica[1].duzina, this.jsonObj[0].skica[1].sirina);
    //   context.strokeRect(this.jsonObj[0].skica[2].x, this.jsonObj[0].skica[2].y, this.jsonObj[0].skica[2].duzina, this.jsonObj[0].skica[2].sirina);
    // }

    //provera da li su sve dimenzije okej
    // for(let i = 0; i < this.jsonObj[0].broj_prostorija*2; i++){
    //   if(this.jsonObj[0].skica[i]==null){
    //     this.poruka = "Nemate dovoljno unetih prostorija";
    //     return;
    //   }
    //   if(this.jsonObj[0].skica[i].x == null || this.jsonObj[0].skica[i].y==null || this.jsonObj[0].skica[i].duzina == null || this.jsonObj[0].skica[i].sirina==null ){
    //     this.poruka = "Morate uneti sve dimenzije";
    //     return;
    //   }
    //   if(this.jsonObj[0].skica[i].x<0 || this.jsonObj[0].skica[i].y<0 || this.jsonObj[0].skica[i].duzina<=0 || this.jsonObj[0].skica[i].sirina<=0 ){
    //     this.poruka = "Sve dimenzije moraju biti pozitivne";
    //     return;
    //   }
    // }

    // if(this.jsonObj[0].broj_prostorija==1){
    //     this.prostorije.push(this.jsonObj[0].skica[0]);
    //   if((this.jsonObj[0].skica[1].duzina == 10 && this.jsonObj[0].skica[1].sirina== 20) ||
    //   (this.jsonObj[0].skica[1].duzina == 20 && this.jsonObj[0].skica[1].sirina== 10)){
    //     if(!this.vrataUSobi(this.jsonObj[0].skica[0], this.jsonObj[0].skica[1])){
    //       this.poruka = "Vrata se ne nalaze u sobi";
    //       return;
    //     }
    //     this.prostorije.push(this.jsonObj[0].skica[1]);
    //   }else {
    //     this.poruka = "Dimenzije vrata nisu dobre";
    //     return;
    //   }
    // }

    // if(this.jsonObj[0].broj_prostorija==2){
    //   if(this.jsonObj[0].skica[1]!=null && this.jsonObj[0].skica[0]!=null && this.jsonObj[0].skica[2]!=null && this.jsonObj[0].skica[3]!=null){
    //   if(this.preklapanje(this.jsonObj[0].skica[0], this.jsonObj[0].skica[1])){
    //     this.poruka = "Prostorije se preklapaju";
    //     return;
    //   }
    //   if(!this.dodirivanje(this.jsonObj[0].skica[0], this.jsonObj[0].skica[1])){
    //     this.poruka = "Prostorije se ne dodiruju";
    //     return;
    //   }else {
        

    //   }

    // }
    // else {
    //   this.poruka = "Nedovoljno podataka za skicu";
    //   return;
    // }
    // }

    // if(this.jsonObj[0].broj_prostorija==3){
    //   if(this.preklapanje(this.jsonObj[0].skica[0], this.jsonObj[0].skica[1])){
    //     this.poruka = "Prostorije se preklapaju";
    //     return;
    //   }
    //   if(this.preklapanje(this.jsonObj[0].skica[0], this.jsonObj[0].skica[2])){
    //     this.poruka = "Prostorije se preklapaju";
    //     return;
    //   }
    //   if(this.preklapanje(this.jsonObj[0].skica[2], this.jsonObj[0].skica[1])){
    //     this.poruka = "Prostorije se preklapaju";
    //     return;
    //   }
    //   if((this.dodirivanje(this.jsonObj[0].skica[0], this.jsonObj[0].skica[1]) && this.dodirivanje(this.jsonObj[0].skica[0], this.jsonObj[0].skica[2])) ||
    //   (this.dodirivanje(this.jsonObj[0].skica[1], this.jsonObj[0].skica[0]) && this.dodirivanje(this.jsonObj[0].skica[1], this.jsonObj[0].skica[2])) ||
    //   (this.dodirivanje(this.jsonObj[0].skica[2], this.jsonObj[0].skica[0]) && this.dodirivanje(this.jsonObj[0].skica[2], this.jsonObj[0].skica[1])) ){
    //     //this.poruka = "Prostorije se dodiruju";
        
    //   }else {
    //     this.poruka = "Prostorije se ne dodiruju";
    //   }
    // }
    // this.kvadratura = 0;
    // for(let i = 0; i < this.jsonObj[0].broj_prostorija; i++){
    //   this.kvadratura+= (this.jsonObj[0].skica[i].duzina*this.jsonObj[0].skica[i].sirina)/400;
    // }
    //   this.kvadratura = Number(this.kvadratura.toFixed());



    this.kvadratura = 0;
    let p1 = new Prostorija();
    p1.x = 0;
    p1.y = 0;
    p1.duzina = 60;
    p1.sirina = 80;
    p1.id = 1;
    this.kvadratura += 12;
    this.prostorije.push(p1);
    if(this.jsonObj[0].broj_prostorija>1){let p2 = new Prostorija();
    p2.x = 0;
    p2.y = 80;
    p2.duzina = 100;
    p2.sirina = 60;
    p2.id = 2;
    this.kvadratura += 15;
    this.prostorije.push(p2);}
    if(this.jsonObj[0].broj_prostorija>2){
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
    if(this.jsonObj[0].broj_prostorija>1){
    let p5 = new Prostorija();
    p5.x = 60;
    p5.y = 120;
    p5.duzina = 10;
    p5.sirina = 20;
    this.prostorije.push(p5);}
    if(this.jsonObj[0].broj_prostorija>2){
    let p6 = new Prostorija();
    p6.x = 80;
    p6.y = 60;
    p6.duzina = 10;
    p6.sirina = 20;
    this.prostorije.push(p6);}
    this.korisnikServis.dodajObjekat(this.jsonObj[0].tip, this.jsonObj[0].adresa, this.jsonObj[0].broj_prostorija, this.kvadratura, this.korisnik.kor_ime, this.prostorije).subscribe((res)=>{
      if(res['message'] == "Objekat je dodat!"){
      //alert("Uspesno ste dodali objekat");
      this.ngOnInit();
      }
    })
  }else{
    this.poruka = "U fajlu se ne nalaze svi potrebni podaci";
  }
  }

}
