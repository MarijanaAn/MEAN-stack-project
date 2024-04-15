import { Prostorija } from "./prostorija";

export class Objekat{
    _id: string;
    id: number;
    tip: string;
    adresa: string;
    broj_prostorija: number;
    kvadratura: number;
    klijent: string;
    skica: Array<Prostorija>;
}