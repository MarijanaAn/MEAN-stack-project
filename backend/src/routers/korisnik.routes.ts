import express from 'express';
import { KorisnikController } from '../controllers/korisnik.controller';

const korisnikRouter = express.Router();

korisnikRouter.route('/prijava').post(
    (req, res)=>new KorisnikController().prijava(req, res)
);

korisnikRouter.route('/mejlZauzet').post(
    (req, res)=>new KorisnikController().mejlZauzet(req, res)
);

korisnikRouter.route('/korImeZauzeto').post(
    (req, res)=>new KorisnikController().korImeZauzeto(req, res)
);

korisnikRouter.route('/promeniLozinku').post(
    (req, res)=>new KorisnikController().promeniLozinku(req, res)
);

korisnikRouter.route('/dohvatiSveAgencije').get(
    (req, res)=>new KorisnikController().dohvatiSveAgencije(req, res)
);

korisnikRouter.route('/dohvatiSveKlijente').get(
    (req, res)=>new KorisnikController().dohvatiSveKlijente(req, res)
);

korisnikRouter.route('/dohvatiKorisnike').get(
    (req, res)=>new KorisnikController().dohvatiKorisnike(req, res)
);

korisnikRouter.route('/dodajKorisnika').post(
    (req, res)=>new KorisnikController().dodajKorisnika(req, res)
);

korisnikRouter.route('/azurirajKorisnika').post(
    (req, res)=>new KorisnikController().azurirajKorisnika(req, res)
);

korisnikRouter.route('/obrisiKorisnika').post(
    (req, res)=>new KorisnikController().obrisiKorisnika(req, res)
);

korisnikRouter.route('/azurirajKlijenta').post(
    (req, res)=>new KorisnikController().azurirajKlijenta(req, res)
);

korisnikRouter.route('/azurirajAgenciju').post(
    (req, res)=>new KorisnikController().azurirajAgenciju(req, res)
);

korisnikRouter.route('/dohvatiKorisnikaPoKorimenu').post(
    (req, res)=>new KorisnikController().dohvatiKorisnikaPoKorimenu(req, res)
);

korisnikRouter.route('/zahtevDodatnaMesta').post(
    (req, res)=>new KorisnikController().zahtevDodatnaMesta(req, res)
);

korisnikRouter.route('/prihvatiZahtevDodatnaMesta').post(
    (req, res)=>new KorisnikController().prihvatiZahtevDodatnaMesta(req, res)
);

korisnikRouter.route('/odbaciZahtevDodatnaMesta').post(
    (req, res)=>new KorisnikController().odbaciZahtevDodatnaMesta(req, res)
);

korisnikRouter.route('/azurirajSlobodnaMesta').post(
    (req, res)=>new KorisnikController().azurirajSlobodnaMesta(req, res)
);


export default korisnikRouter;