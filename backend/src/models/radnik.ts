import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Radnik = new Schema(

    {
        id: {
            type: Number
        },
        telefon: {
            type: String
        },
        mejl: {
            type: String
        },
        ime: {
            type: String
        },
        prezime: {
            type: String
        },
        specijalizacija: {
            type: String
        }, 
        agencija: {
            type: String
        }, 
        zauzet: {
            type: Boolean
        },
        objekat: {
            type: String
        },
        prostorija: {
            type: Number
        }

    });

export default mongoose.model('RadnikModel', Radnik, 'radnici');