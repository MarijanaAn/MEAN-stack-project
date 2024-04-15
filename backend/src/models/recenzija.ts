import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Recenzija = new Schema(
    {
        id: {
            type: Number
        },
        ocena: {
            type: Number
        }, 
        komentar: {
            type: String
        },
        klijent :{
            type: String
        }, 
        agencija: {
            type: String
        }
    });

export default mongoose.model('RecenzijaModel', Recenzija, 'recenzije');