import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Ids = new Schema(
    { 
        id: {
        type: Number
        },
        radnici: {
            type: Number
        },
        objekti: {
            type: Number
        }, 
        korisnici: {
            type: Number
        },
        poslovi :{
            type: Number
        }
    });

export default mongoose.model('IdsModel', Ids, 'ids');