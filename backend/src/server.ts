import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import korisnikRouter from './routers/korisnik.routes';
import zahteviRouter from './routers/zahtevi.routes';
import jedinstvenoRouter from './routers/jedinstveno.routes';
import radnikRouter from './routers/radnik.routes';
import objekatRouter from './routers/objekat.routes';
import idsRouter from './routers/ids.routes';
import recenzijaRouter from './routers/recenzija.routes';
import posaoRouter from './routers/posao.routes';


const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/projekat');  
const conn = mongoose.connection;
conn.once('open', ()=>{
    console.log("Konekcija sa bazom je uspesna");
})

const router = express.Router(); //dodaj rutere za kolekcije u bazi
router.use('/korisnici', korisnikRouter);
router.use('/zahtevi', zahteviRouter);
router.use('/jedinstveno', jedinstvenoRouter);
router.use('/radnici', radnikRouter);
router.use('/objekti', objekatRouter);
router.use('/ids', idsRouter);
router.use('/recenzije', recenzijaRouter);
router.use('/poslovi', posaoRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));