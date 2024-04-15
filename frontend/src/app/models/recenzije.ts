import { Korisnik } from "./korisnik";

export class Recenzije {
    _id: string;
    id: number;
    ocena: number;
    komentar: string;
    klijent: Korisnik;
    agencija: string;
}