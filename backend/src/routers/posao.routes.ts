import express from 'express';
import { PosaoController} from '../controllers/posao.controller';

const posaoRouter = express.Router();

posaoRouter.route('/traziSaradnju').post(
    (req, res)=>new PosaoController().traziSaradnju(req, res)
);

posaoRouter.route('/prihvatiZahtev').post(
    (req, res)=>new PosaoController().prihvatiZahtev(req, res)
);

posaoRouter.route('/prihvatiPonudu').post(
    (req, res)=>new PosaoController().prihvatiPonudu(req, res)
);

posaoRouter.route('/odbijPonudu').post(
    (req, res)=>new PosaoController().odbijPonudu(req, res)
);

posaoRouter.route('/odbijZahtev').post(
    (req, res)=>new PosaoController().odbijZahtev(req, res)
);

posaoRouter.route('/zavrsiPosao').post(
    (req, res)=>new PosaoController().zavrsiPosao(req, res)
);

posaoRouter.route('/zavrseniPoslovi').get(
    (req, res)=>new PosaoController().zavrseniPoslovi(req, res)
);



posaoRouter.route('/aktivniPosloviAgencije').post(
    (req, res)=>new PosaoController().aktivniPosloviAgencije(req, res)
);

posaoRouter.route('/dohvatiPosloveKlijenta').post(
    (req, res)=>new PosaoController().dohvatiPosloveKlijenta(req, res)
);

posaoRouter.route('/dohvatiZahteveAgencije').post(
    (req, res)=>new PosaoController().dohvatiZahteveAgencije(req, res)
);

posaoRouter.route('/dohvatiZahteveKlijenta').post(
    (req, res)=>new PosaoController().dohvatiZahteveKlijenta(req, res)
);

posaoRouter.route('/dohvatiPoslove').get(
    (req, res)=>new PosaoController().dohvatiPoslove(req, res)
);

posaoRouter.route('/nedovoljoRadnika').post(
    (req, res)=>new PosaoController().nedovoljoRadnika(req, res)
);


posaoRouter.route('/dodajRadnike').post(
    (req, res)=>new PosaoController().dodajRadnike(req, res)
);

posaoRouter.route('/azurirajAgencijuPosla').post(
    (req, res)=>new PosaoController().azurirajAgencijuPosla(req, res)
);

posaoRouter.route('/azurirajKlijentaPosla').post(
    (req, res)=>new PosaoController().azurirajKlijentaPosla(req, res)
);

posaoRouter.route('/obrisiPosloveAgencije').post(
    (req, res)=>new PosaoController().obrisiPosloveAgencije(req, res)
);

posaoRouter.route('/obrisiPosloveKlijenta').post(
    (req, res)=>new PosaoController().obrisiPosloveKlijenta(req, res)
);

posaoRouter.route('/dohvatiPosloveObjekta').post(
    (req, res)=>new PosaoController().dohvatiPosloveObjekta(req, res)
);

posaoRouter.route('/otkaziPosao').post(
    (req, res)=>new PosaoController().otkaziPosao(req, res)
);

posaoRouter.route('/odbijOtkazivanjePosla').post(
    (req, res)=>new PosaoController().odbijOtkazivanjePosla(req, res)
);

posaoRouter.route('/zahtevZaOtkazivanje').post(
    (req, res)=>new PosaoController().zahtevZaOtkazivanje(req, res)
);

posaoRouter.route('/dohvatiZahteveZaOtkazivanje').get(
    (req, res)=>new PosaoController().dohvatiZahteveZaOtkazivanje(req, res)
);

posaoRouter.route('/dohvatiPosaoPoId').post(
    (req, res)=>new PosaoController().dohvatiPosaoPoId(req, res)
);

posaoRouter.route('/dohvatiPosloveOdredjenogStatusa').post(
    (req, res)=>new PosaoController().dohvatiPosloveOdredjenogStatusa(req, res)
);



export default posaoRouter;