import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Posao = new Schema(
    { 
        id: {
        type: Number
        },
        objekat: {
            type: String
        },
        klijent: {
            type: String
        },
        agencija: { 
            type: String
        }, 
        vreme: {
            type: Number
        },
        ponuda: {
            type: Number
        }, 
        zahtev: { //da li je agencija prihvatila zahtev ili ne
            type: String
        },
        status: {
            type: String
        },
        nedovoljno:{
            type: Boolean
        }, 
        radnici: {
            type: Array
        },
        razlog: {
            type: String
        }
    });

export default mongoose.model('PosaoModel', Posao, 'poslovi');