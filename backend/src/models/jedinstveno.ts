import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Jedinstveno = new Schema(
    {
        kor_ime: {
            type: String
        },
        mejl: {
            type: String
        }
    });

export default mongoose.model('JedinstvenoModel', Jedinstveno, 'jedinstveno');