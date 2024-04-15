import express from 'express';
import { ZahteviController } from '../controllers/zahtevi.controller';

const zahteviRouter = express.Router();

zahteviRouter.route('/dodajZahtev').post(
    (req, res)=>new ZahteviController().dodajZahtev(req, res)
);

zahteviRouter.route('/dohvatiZahteve').get(
    (req, res)=>new ZahteviController().dohvatiZahteve(req, res)
);

zahteviRouter.route('/dohvatiZahtevPoKorimenu').post(
    (req, res)=>new ZahteviController().dohvatiZahtevPoKorimenu(req, res)
);

zahteviRouter.route('/obrisiZahtev').post(
    (req, res)=>new ZahteviController().obrisiZahtev(req, res)
);

export default zahteviRouter;