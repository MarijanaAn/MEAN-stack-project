import express from 'express';
import { JedinstvenoController } from '../controllers/jedinstveno.controller';

const jedinstvenoRouter = express.Router();

jedinstvenoRouter.route('/mejlZauzet').post(
    (req, res)=>new JedinstvenoController().mejlZauzet(req, res)
);

jedinstvenoRouter.route('/korImeZauzeto').post(
    (req, res)=>new JedinstvenoController().korImeZauzeto(req, res)
);

jedinstvenoRouter.route('/dodaj').post(
    (req, res)=>new JedinstvenoController().dodaj(req, res)
);

jedinstvenoRouter.route('/azurirajMejl').post(
    (req, res)=>new JedinstvenoController().azurirajMejl(req, res)
);

jedinstvenoRouter.route('/azurirajStariMejl').post(
    (req, res)=>new JedinstvenoController().azurirajStariMejl(req, res)
);

jedinstvenoRouter.route('/azurirajKorimeIMejl').post(
    (req, res)=>new JedinstvenoController().azurirajKorimeIMejl(req, res)
);

export default jedinstvenoRouter;