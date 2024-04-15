import express from 'express';
import { RecenzijaController } from '../controllers/recenzija.controller';

const recenzijaRouter = express.Router();

recenzijaRouter.route('/dohvatiRecenzije').post(
    (req, res)=>new RecenzijaController().dohvatiRecenzije(req, res)
);

recenzijaRouter.route('/dohvatiRecenzijuKorisnika').post(
    (req, res)=>new RecenzijaController().dohtaviRecenzijuKlijenta(req, res)
);

recenzijaRouter.route('/azurirajRecenziju').post(
    (req, res)=>new RecenzijaController().azurirajRecenziju(req, res)
);

recenzijaRouter.route('/obrisiRecenziju').post(
    (req, res)=>new RecenzijaController().obrisiRecenziju(req, res)
);

recenzijaRouter.route('/dodajRecenziju').post(
    (req, res)=>new RecenzijaController().dodajRecenziju(req, res)
);

recenzijaRouter.route('/azurirajRecenzijuKlijenta').post(
    (req, res)=>new RecenzijaController().azurirajRecenzijuKlijenta(req, res)
);

recenzijaRouter.route('/azurirajRecenzijuAgencije').post(
    (req, res)=>new RecenzijaController().azurirajRecenzijuAgencije(req, res)
);

recenzijaRouter.route('/obrisiRecenzijuAgencije').post(
    (req, res)=>new RecenzijaController().obrisiRecenzijuAgencije(req, res)
);

recenzijaRouter.route('/obrisiRecenzijeKlijenta').post(
    (req, res)=>new RecenzijaController().obrisiRecenzijeKlijenta(req, res)
);

export default recenzijaRouter;