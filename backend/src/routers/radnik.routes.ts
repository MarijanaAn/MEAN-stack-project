import express from 'express';
import { RadnikController } from '../controllers/radnik.controller';

const radnikRouter = express.Router();

radnikRouter.route('/dohvatiRadnikaAgencije').post(
    (req, res)=>new RadnikController().dohvatiRadnikaAgencije(req, res)
);

radnikRouter.route('/dohvatiSlobodneRadnikeAgencije').post(
    (req, res)=>new RadnikController().dohvatiSlobodneRadnikeAgencije(req, res)
);

radnikRouter.route('/azurirajRadnika').post(
    (req, res)=>new RadnikController().azurirajRadnika(req, res)
);

radnikRouter.route('/dodajRadnika').post(
    (req, res)=>new RadnikController().dodajRadnika(req, res)
);

radnikRouter.route('/dodajRadnikaIzBaze').post(
    (req, res)=>new RadnikController().dodajRadnikaIzBaze(req, res)
);

radnikRouter.route('/obrisiRadnika').post(
    (req, res)=>new RadnikController().obrisiRadnika(req, res)
);

radnikRouter.route('/zauzetostRadnika').post(
    (req, res)=>new RadnikController().zauzetostRadnika(req, res)
);

radnikRouter.route('/azurirajAgencijuRadnika').post(
    (req, res)=>new RadnikController().azurirajAgencijuRadnika(req, res)
);

radnikRouter.route('/obrisiAgencijuRadnika').post(
    (req, res)=>new RadnikController().obrisiAgencijuRadnika(req, res)
);

export default radnikRouter;