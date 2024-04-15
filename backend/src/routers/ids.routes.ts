import express from 'express';
import { IdsController } from '../controllers/ids.controller';

const idsRouter = express.Router();

idsRouter.route('/dohvatiIds').get(
    (req, res)=>new IdsController().dohvatiIds(req, res)
);

idsRouter.route('/incObjekat').post(
    (req, res)=>new IdsController().incObjekat(req, res)
);

idsRouter.route('/incKorisnik').post(
    (req, res)=>new IdsController().incKorisnik(req, res)
);

idsRouter.route('/incPoslovi').post(
    (req, res)=>new IdsController().incPoslovi(req, res)
);

idsRouter.route('/incRadnici').post(
    (req, res)=>new IdsController().incRadnici(req, res)
);

export default idsRouter;