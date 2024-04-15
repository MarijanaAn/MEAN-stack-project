import { Korisnik } from "./korisnik";
import { Objekat } from "./objekat";
import { Radnik } from "./radnik";

export class Posao {
    _id: string;
    id: number;
    objekat: Objekat;
    klijent: Korisnik;
    agencija: Korisnik;
    vreme: number;
    ponuda: number;
    zahtev: string;
    status: string;
    prihvacen: boolean;
    nedovoljno: boolean;
    radnici: Array<Radnik>;
    razlog: string;
}