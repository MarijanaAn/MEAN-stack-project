import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Objekat = new Schema(

    {
        id: {
            type: Number
        },
        tip: {
            type: String
        },
        adresa: {
            type: String
        },
        broj_prostorija: {
            type: Number
        },
        kvadratura: {
            type: Number
        },
        skica: {
            type: Array
        },
        klijent: {
            type: String 
        }
    });

export default mongoose.model('ObjekatModel', Objekat, 'objekti');