import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  uri= 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  prijava(kor_ime, lozinka){
    const podaci = {
      kor_ime: kor_ime, 
      lozinka: lozinka
      }
    return this.http.post(`${this.uri}/korisnici/prijava`, podaci);
  }

  mejlZauzet(mejl){
    const podaci = {
      mejl: mejl
    }
    return this.http.post(`${this.uri}/jedinstveno/mejlZauzet`, podaci);
  }

  korImeZauzeto(kor_ime){
    const podaci = {
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/jedinstveno/korImeZauzeto`, podaci);
  }

  dodaj(kor_ime, mejl){
    const podaci={
      kor_ime: kor_ime,
      mejl: mejl
    }
    return this.http.post(`${this.uri}/jedinstveno/dodaj`, podaci);
  }

  dohvatiZahteve() {
    return this.http.get(`${this.uri}/zahtevi/dohvatiZahteve`);
  }



  dodajZahtev(ime, prezime, kor_ime, lozinka, tip, mejl, telefon, naziv, adresa, maticni_broj, opis, slika){
    const podaci = {
      ime: ime,
      prezime: prezime,
      kor_ime: kor_ime,
      lozinka: lozinka,
      tip: tip,
      mejl: mejl, 
      telefon: telefon,
      naziv: naziv,
      adresa: adresa,
      maticni_broj: maticni_broj,
      opis: opis,
      slika: slika


    }
    return this.http.post(`${this.uri}/zahtevi/dodajZahtev`, podaci);
  }

  promeniLozinku(kor_ime, stara, nova){
    const podaci = {
      kor_ime: kor_ime,
      stara: stara,
      nova: nova
    }
    return this.http.post(`${this.uri}/korisnici/promeniLozinku`, podaci);
  }

  dohvatiAgencije(){
    return this.http.get(`${this.uri}/korisnici/dohvatiSveAgencije`);
  }

  dohvatiKlijente(){
    return this.http.get(`${this.uri}/korisnici/dohvatiSveKlijente`);
  }

  dohvatiKorisnike(){
    return this.http.get(`${this.uri}/korisnici/dohvatiKorisnike`);
  }

  dodajKorisnika( ime, prezime, kor_ime, lozinka, tip, mejl, telefon, naziv, adresa, maticni_broj, opis, slika){
    const podaci = {
      ime: ime,
      prezime: prezime,
      kor_ime: kor_ime,
      lozinka: lozinka,
      tip: tip,
      mejl: mejl, 
      telefon: telefon,
      naziv: naziv,
      adresa: adresa,
      maticni_broj: maticni_broj,
      opis: opis,
      slika: slika
    }
    return this.http.post(`${this.uri}/korisnici/dodajKorisnika`, podaci);
  }

  dohvatiZahtevPoKorimenu(kor_ime){
    const podaci = {
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/zahtevi/dohvatiZahtevPoKorimenu`, podaci);
  }

  obrisiZahtev(kor_ime){
    const podaci = {
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/zahtevi/obrisiZahtev`, podaci);
  }

  obrisiKorisnika(kor_ime){
    const podaci = {
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/korisnici/obrisiKorisnika`, podaci);
  }

  azurirajKorisnika( kor_ime, ime, prezime, mejl, telefon, naziv, adresa, opis, maticni_broj, slika){
    const podaci = {
      kor_ime_staro: kor_ime,
      ime: ime, 
      prezime: prezime, 
      mejl:mejl,
      telefon: telefon,
      naziv: naziv,
      opis: opis, 
      adresa: adresa, 
      maticni_broj: maticni_broj, 
      slika: slika
    }
    return this.http.post(`${this.uri}/korisnici/azurirajKorisnika`, podaci);
  }

  azurirajKlijenta(kor_ime_staro, kor_ime, ime, prezime, mejl, telefon, slika){
    const podaci = {
      kor_ime_staro: kor_ime_staro,
      kor_ime: kor_ime,
      ime: ime,
      prezime: prezime,
      mejl: mejl,
      telefon: telefon, slika: slika
    }
    return this.http.post(`${this.uri}/korisnici/azurirajKlijenta`, podaci);
  }

  azurirajAgenciju(kor_ime_staro, kor_ime, naziv, adresa, opis, mejl, telefon, slika){
    const podaci = {
      kor_ime_staro: kor_ime_staro,
      kor_ime: kor_ime,
      naziv: naziv,
      adresa: adresa,
      opis: opis,
      mejl: mejl,
      telefon: telefon, 
      slika: slika,
      
    }
    return this.http.post(`${this.uri}/korisnici/azurirajAgenciju`, podaci);
  }

  azurirajMejl(kor_ime, mejl){
    const podaci = {
      kor_ime: kor_ime,
      mejl: mejl
    }
    return this.http.post(`${this.uri}/jedinstveno/azurirajMejl`, podaci);
  }

  azurirajKorimeIMejl(kor_ime_staro, kor_ime, mejl){
    const podaci = {
      kor_ime_staro: kor_ime_staro,
      kor_ime: kor_ime,
      mejl: mejl
    }
    return this.http.post(`${this.uri}/jedinstveno/azurirajKorimeIMejl`, podaci);
  }

  dohvatiRecenzije(agencija){
    const podaci = {
      agencija: agencija
    }
    return this.http.post(`${this.uri}/recenzije/dohvatiRecenzije`, podaci);
  }

  // dohvatiIds(){
  //   return this.http.get(`${this.uri}/ids/dohvatiIds`);
  // }

  // incKorisnike(korisnici){
  //   const podaci = {
  //     korisnici: korisnici
  //   }
  //   return this.http.post(`${this.uri}/ids/incKorisnik`, podaci);
  // }

  // incObjekte(objekti){
  //   const podaci = {
  //     objekti: objekti
  //   }
  //   return this.http.post(`${this.uri}/ids/incObjekat`, podaci);
  // }

  // incRadnike(radnici){
  //   const podaci = {
  //     radnici: radnici
  //   }
  //   return this.http.post(`${this.uri}/ids/incRadnici`, podaci);
  // }

  // incPoslove(poslovi){
  //   const podaci = {
  //     poslovi: poslovi
  //   }
  //   return this.http.post(`${this.uri}/ids/incPoslovi`, podaci);
  // }

  dohvatiKorisnika(kor_ime){
    const podaci = {
      kor_ime: kor_ime
    }
    return this.http.post(`${this.uri}/korisnici/dohvatiKorisnikaPoKorimenu`, podaci);
  }

  dohvatiObjekte(kor_ime){
    const podaci = {
      klijent: kor_ime
    }
    return this.http.post(`${this.uri}/objekti/dohvatiObjekteKlijenta`, podaci);
  }

  obrisiObjekat(id){
    const podaci = {
      id: id
    }
    return this.http.post(`${this.uri}/objekti/obrisiObjekat`, podaci);
  }

  azurirajObjekat(id, tip,adresa, broj_prostorija, kvadratura, prostorije){
    const podaci = {
      id: id,
      tip: tip,
      adresa: adresa,
      broj_prostorija: broj_prostorija,
      kvadratura: kvadratura, 
      skica: prostorije
    }
    return this.http.post(`${this.uri}/objekti/azurirajObjekat`, podaci);
  }

  dodajObjekat( tip, adresa, broj_prostorija, kvadratura, klijent, prostorije){
    const podaci = {
      tip: tip,
      adresa: adresa,
      broj_prostorija: broj_prostorija,
      kvadratura: kvadratura,
      klijent: klijent,
      skica: prostorije
      
    }
    return this.http.post(`${this.uri}/objekti/dodajObjekat`, podaci);
  }

  dohvatiRadnike(agencija){
    const podaci = {
      agencija: agencija
    }
    return this.http.post(`${this.uri}/radnici/dohvatiRadnikaAgencije`, podaci);
  }

  dohvatiSlobodneRadnike(agencija){
    const podaci = {
      agencija: agencija
    }
    return this.http.post(`${this.uri}/radnici/dohvatiSlobodneRadnikeAgencije`, podaci);
  }

  obrisiRadnika(id){
    const podaci = {
      id: id
    }
    return this.http.post(`${this.uri}/radnici/obrisiRadnika`, podaci);
  }

  azurirajRadnika(id, ime, prezime, mejl, telefon, specijalizacija){
    const podaci = {
      id: id, 
      ime: ime, 
      prezime: prezime,
      mejl: mejl,
      telefon: telefon, 
      specijalizacija: specijalizacija,
      zauzet: false

    }
    return this.http.post(`${this.uri}/radnici/azurirajRadnika`, podaci);
  }

  dodajRadnika( ime, prezime, mejl, telefon, specijalizacija, agencija){
    const podaci = { 
      ime: ime, 
      prezime: prezime,
      mejl: mejl,
      telefon: telefon, 
      specijalizacija: specijalizacija, 
      agencija: agencija,
      zauzet: false
    }
    return this.http.post(`${this.uri}/radnici/dodajRadnika`, podaci);
  }

  dodajRadnikaIzBaze(id, agencija){
    const podaci = {
      id: id, 
      agencija: agencija
    }

    return this.http.post(`${this.uri}/radnici/dodajRadnikaIzBaze`, podaci);
  }

traziSaradnju( klijent, agencija, objekat, vreme){
  const podaci = {
    klijent: klijent, 
    agencija: agencija,
    objekat: objekat, 
    vreme: vreme, 
    nedovoljno: false
  }

  return this.http.post(`${this.uri}/poslovi/traziSaradnju`, podaci);
}

prihvatiZahtev(id, ponuda){
const podaci = {
  id: id, 
  ponuda: ponuda
}

return this.http.post(`${this.uri}/poslovi/prihvatiZahtev`, podaci);
}

odbijZahtev(id) {
  const podaci = {
    id: id
  }

  return this.http.post(`${this.uri}/poslovi/odbijZahtev`, podaci);
}

prihvatiPonudu(id) {
  const podaci = {
    id: id
  }

  return this.http.post(`${this.uri}/poslovi/prihvatiPonudu`, podaci);
}

odbijPonudu(id) {
  const podaci = {
    id: id
  }

  return this.http.post(`${this.uri}/poslovi/odbijPonudu`, podaci);
}

zavrsiPosao(id) {
  const podaci = {
    id: id
  }

  return this.http.post(`${this.uri}/poslovi/zavrsiPosao`, podaci);
}

zavrseniPoslovi(){
  return this.http.get(`${this.uri}/poslovi/zavrseniPoslovi`);
}

aktivniPoslovi(agencija){
  const podaci = {
    agencija: agencija
  }
  return this.http.post(`${this.uri}/poslovi/aktivniPosloviAgencije`, podaci);
}

dohvatiPosloveKlijenta(klijent) {
  const podaci = {
    klijent: klijent
  }

  return this.http.post(`${this.uri}/poslovi/dohvatiPosloveKlijenta`, podaci);
}

dohvatiZahteveAgencije(agencija) {
  const podaci = {
    agencija: agencija
  }

  return this.http.post(`${this.uri}/poslovi/dohvatiZahteveAgencije`, podaci);
}

dohvatiObjekatPoid(id){
  const podaci = {
    id: id
  }

  return this.http.post(`${this.uri}/objekti/dohvatiObjekatPoid`, podaci);
}

dohvatiRecenzijuKorisnika(klijent, agencija){
  const podaci = {
    klijent: klijent, 
    agencija:agencija
  }
  return this.http.post(`${this.uri}/recenzije/dohvatiRecenzijuKorisnika`, podaci);
}
azurirajRecenziju(klijent, agencija, komentar, ocena){
  const podaci = {
    klijent: klijent, 
    agencija:agencija, 
    komentar: komentar,
    ocena: ocena
  }
  return this.http.post(`${this.uri}/recenzije/azurirajRecenziju`, podaci);
}

obrisiRecenziju(klijent, agencija){
  const podaci = {
    klijent: klijent, 
    agencija:agencija
  }
  return this.http.post(`${this.uri}/recenzije/obrisiRecenziju`, podaci);
}

dodajRecenziju(klijent, agencija,komentar, ocena){
  const podaci = {
    ocena: ocena,
    komentar: komentar,
    klijent: klijent, 
    agencija: agencija
  }
  return this.http.post(`${this.uri}/recenzije/dodajRecenziju`, podaci);
}

dohvatiZahteveKlijenta(klijent){
  const podaci = {
    klijent: klijent
  }
  return this.http.post(`${this.uri}/poslovi/dohvatiZahteveKlijenta`, podaci);
}

dohvatiPoslove(){
  return this.http.get(`${this.uri}/poslovi/dohvatiPoslove`);
}

azurirajStariMejl(mejl_stari, mejl){
  const podaci = {
    mejl_stari: mejl_stari,
    mejl: mejl
  }
  return this.http.post(`${this.uri}/jedinstveno/azurirajStariMejl`, podaci);
}

azurirajNedovoljnoRadnika(id, nedovoljno){
const podaci = {
  id: id, nedovoljno: nedovoljno
}
return this.http.post(`${this.uri}/poslovi/nedovoljoRadnika`, podaci);
}

dodajRadnikeNaPosao( id, radnici){
  const podaci = {
    id: id, radnici: radnici
  }
  return this.http.post(`${this.uri}/poslovi/dodajRadnike`, podaci);
}

zauzetostRadnika( id, zauzet){
  const podaci = {
    id: id,
  zauzet: zauzet
  }
  return this.http.post(`${this.uri}/radnici/zauzetostRadnika`, podaci);
}

zapocniSobu(id, soba){
  const podaci = {
    id: id, 
    soba: soba
  }
  return this.http.post(`${this.uri}/objekti/zapocniSobu`, podaci);
}

zavrsiSobu(id, soba){
  const podaci = {
    id: id, 
    soba: soba
  }
  return this.http.post(`${this.uri}/objekti/zavrsiSobu`, podaci);
}
vratiObjekatNaInic(id, soba){
  const podaci = {
    id: id, 
    soba: soba
  }
  return this.http.post(`${this.uri}/objekti/vratiSobuNainicijalno`, podaci);
}

azurirajRecenzijeKlijenta(klijent_staro, klijent){
  const podaci = {
    klijent_staro: klijent_staro,
    klijent: klijent
  }
  return this.http.post(`${this.uri}/recenzije/azurirajRecenzijuKlijenta`, podaci);
}

azurirajRecenzijeAgencije(agencija_staro, agencija){
  const podaci = {
    agencija_staro: agencija_staro,
    agencija: agencija
  }
  return this.http.post(`${this.uri}/recenzije/azurirajRecenzijuAgencije`, podaci);
}

azurirajObjekteKlijenta(klijent_staro, klijent){
  const podaci = {
    klijent_staro: klijent_staro,
    klijent: klijent
  }
  return this.http.post(`${this.uri}/objekti/azurirajObjekteKlijenta`, podaci);
}

azurirajPosloveKlijenta(klijent_staro, klijent){
  const podaci = {
    klijent_staro: klijent_staro,
    klijent: klijent
  }
  return this.http.post(`${this.uri}/poslovi/azurirajKlijentaPosla`, podaci);
}

azurirajPosloveAgencije(agencija_staro, agencija){
  const podaci = {
    agencija_staro: agencija_staro,
    agencija: agencija
  }
  return this.http.post(`${this.uri}/poslovi/azurirajAgencijuPosla`, podaci);
}

azurirajRadnikeAgencije(agencija_staro, agencija){
  const podaci = {
    agencija_staro: agencija_staro,
    agencija: agencija
  }
  return this.http.post(`${this.uri}/radnici/azurirajAgencijuRadnika`, podaci);
}

obrisiObjekteKlijenta(klijent){
  const podaci = {
    klijent: klijent
  }
  return this.http.post(`${this.uri}/objekti/obrisiObjekteKlijenta`, podaci);
}

obrisiPosloveKlijenta(klijent){
  const podaci = {
    klijent: klijent
  }
  return this.http.post(`${this.uri}/poslovi/obrisiPosloveKlijenta`, podaci);
}

obrisiRecenzijeKlijenta(klijent){
  const podaci = {
    klijent: klijent
  }
  return this.http.post(`${this.uri}/recenzije/obrisiRecenzijeKlijenta`, podaci);
}

obrisiRecenzijeAgencije(agencija){
  const podaci = {
    agencija: agencija
  }
  return this.http.post(`${this.uri}/recenzije/obrisiRecenzijuAgencije`, podaci);
}

obrisiPosloveAgencije(agencija){
  const podaci = {
    agencija: agencija
  }
  return this.http.post(`${this.uri}/poslovi/obrisiPosloveAgencije`, podaci);
}

obrisiRadnikeAgencije(agencija){
  const podaci = {
    agencija: agencija
  }
  return this.http.post(`${this.uri}/radnici/obrisiAgencijuRadnika`, podaci);
}

dohvatiPosloveObjekta(objekat){
  const podaci = {
    objekat: objekat
  }
  return this.http.post(`${this.uri}/poslovi/dohvatiPosloveObjekta`, podaci);
}

otkaziPosao(id){
  const podaci = {
    id: id
  }
  return this.http.post(`${this.uri}/poslovi/otkaziPosao`, podaci);
}

zahtevZaOtkazivanje(id, razlog){
  const podaci = {
    id: id, razlog: razlog
  }
  return this.http.post(`${this.uri}/poslovi/zahtevZaOtkazivanje`, podaci);
}

odbijOtkazivanjePosla(id){
  const podaci = {
    id: id
  }
  return this.http.post(`${this.uri}/poslovi/odbijOtkazivanjePosla`, podaci);
}

dohvatiZahteveZaOtkazivanje(){
  return this.http.get(`${this.uri}/poslovi/dohvatiZahteveZaOtkazivanje`);
}

dohvatiPosloveOdredjenogStatusa(status){
  const podaci = {
    status: status
  }
  return this.http.post(`${this.uri}/poslovi/dohvatiPosloveOdredjenogStatusa`, podaci);
}

zahtevDodatnaMesta(kor_ime, dodatno){
  const podaci = {
    kor_ime: kor_ime, 
    dodatno: dodatno
  }
  return this.http.post(`${this.uri}/korisnici/zahtevDodatnaMesta`, podaci);
}

odbaciZahtevDodatnaMesta(kor_ime){
  const podaci = {
    kor_ime: kor_ime   
  }
  return this.http.post(`${this.uri}/korisnici/odbaciZahtevDodatnaMesta`, podaci);
}

prihvatiZahtevDodatnaMesta(kor_ime, dodatno){
  const podaci = {
    kor_ime: kor_ime, 
    dodatno: dodatno
  }
  return this.http.post(`${this.uri}/korisnici/prihvatiZahtevDodatnaMesta`, podaci);
}

azurirajSlobodnaMesta(kor_ime, slobodno){
  const podaci = {
    kor_ime: kor_ime, 
    slobodno: slobodno
  }
  return this.http.post(`${this.uri}/korisnici/azurirajSlobodnaMesta`, podaci);
}
  
}
