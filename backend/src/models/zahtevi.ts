import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Zahtev = new Schema(

    {id: {
        type: Number
    },
        kor_ime: {
            type: String
        },
        lozinka: {
            type: String
        },
        telefon: {
            type: String
        },
        mejl: {
            type: String
        },
        tip: {
            type: String
        },
        ime: {
            type: String
        },
        prezime: {
            type: String
        },
        naziv: {
            type: String
        },
        adresa: {
            type: String
        },
        maticni_broj: {
            type: String
        },
        opis: {
            type: String
        },
        slobodno: {
            type: Number
        },
        slika: {
            type: String
        }
    });

export default mongoose.model('ZahteviModel', Zahtev, 'zahtevi');