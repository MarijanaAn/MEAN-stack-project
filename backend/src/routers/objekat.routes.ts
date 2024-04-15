import express from 'express';
import { ObjekatController } from '../controllers/objekat.controller';

const objekatRouter = express.Router();

objekatRouter.route('/dohvatiObjekteKlijenta').post(
    (req, res)=>new ObjekatController().dohvatiObjekteKlijenta(req, res)
);

objekatRouter.route('/obrisiObjekat').post(
    (req, res)=>new ObjekatController().obrisiObjekat(req, res)
);

objekatRouter.route('/azurirajObjekat').post(
    (req, res)=>new ObjekatController().azurirajObjekat(req, res)
);

objekatRouter.route('/dodajObjekat').post(
    (req, res)=>new ObjekatController().dodajObjekat(req, res)
);

objekatRouter.route('/dohvatiObjekatPoid').post(
    (req, res)=>new ObjekatController().dohvatiObjekatPoid(req, res)
);

objekatRouter.route('/zapocniSobu').post(
    (req, res)=>new ObjekatController().zapocniSobu(req, res)
);

objekatRouter.route('/zavrsiSobu').post(
    (req, res)=>new ObjekatController().zavrsiSobu(req, res)
);

objekatRouter.route('/vratiSobuNainicijalno').post(
    (req, res)=>new ObjekatController().vratiSobuNainicijalno(req, res)
);

objekatRouter.route('/azurirajObjekteKlijenta').post(
    (req, res)=>new ObjekatController().azurirajObjekteKlijenta(req, res)
);

objekatRouter.route('/obrisiObjekteKlijenta').post(
    (req, res)=>new ObjekatController().obrisiObjekteKlijenta(req, res)
);


export default objekatRouter;