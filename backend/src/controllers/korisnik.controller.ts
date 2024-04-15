import express from 'express';
import KorisnikModel from '../models/korisnik';


export class KorisnikController{

    prijava = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;
        let lozinka = req.body.lozinka;
        
        KorisnikModel.findOne({kor_ime: kor_ime, lozinka: lozinka}, (err, kor)=>{
            if(err) {
                console.log(err);
                res.json(err);
            } else res.json(kor);
        });
    }

    // registracijaKlijenta = (req: express.Request, res: express.Response) => {
    // let k = new klijent(req.body.klijent);
    
    // k.save().then((kl)=> {
    //     res.json({ poruka : "Zahtev za registraciju klijenta je dodat!" });
    // }).catch((err) => {
    //     res.json(err);
    // });
    // }

    // registracijaAgencije = (req: express.Request, res: express.Response) => {
    //     let a = new agencija(req.body.agencija);
        
    //     a.save().then((agen)=> {
    //         res.json({ poruka : "Zahtev za registraciju agencije je dodat!" });
    //     }).catch((err) => {
    //         res.json(err);
    //     });
    // }

    mejlZauzet= (req: express.Request, res: express.Response) => {
        let mejl = req.body.mejl;

        KorisnikModel.find({'mejl' : mejl}, (err, kor) => {
            if(err) console.log(err);
            else{
                console.log(kor);
                if(kor.length == 0) res.json({'message' : 'jeste'});
                else res.json({'message': 'nije'})
            }
        })
    }

    korImeZauzeto= (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;

        KorisnikModel.find({'kor_ime' : kor_ime}, (err, kor) => {
            if(err) console.log(err);
            else{
                console.log(kor);
                if(kor.length == 0) res.json({'message' : 'jeste'});
                else res.json({'message': 'nije'})
            }
        })
    }

    promeniLozinku = (req: express.Request, res: express.Response) =>{
        let kor_ime = req.body.kor_ime;
        let stara = req.body.stara;
        let nova = req.body.nova;


        KorisnikModel.updateOne({'kor_ime' : kor_ime, 'lozinka' : stara},{'lozinka': nova}, (err, k)=>{
            if(err) console.log(err);
            else res.json(k);
        })
    }

    dohvatiSveAgencije = (req: express.Request, res: express.Response) =>{
    KorisnikModel.find({'tip': "agencija"}, (err, a)=>{
        if(err) console.log(err);
        else res.json(a);
        })
    }

    dohvatiSveKlijente = (req: express.Request, res: express.Response) =>{
        KorisnikModel.find({'tip': "klijent"}, (err, k)=>{
            if(err) console.log(err);
            else res.json(k);
            })
        }

    dohvatiKorisnike = (req: express.Request, res: express.Response) =>{
    KorisnikModel.find({'tip' : {$ne: "admin"}}, (err, k)=>{
        if(err) console.log(err);
        else res.json(k);
         })
         }

     dodajKorisnika = (req: express.Request, res: express.Response) =>{
        KorisnikModel.find({},(err, resp) =>{
            if(err) console.log(err);
            else {
                //let id = resp.length + 1;
                let k = new KorisnikModel(req.body);
                k.slobodno = 0;
                //k.id = id;

        k.save().then((kor)=> {
                    res.json({ "message" : "Korisnik je dodat!" });
                }).catch((err) => {
                    res.json({'message' :'Doslo je do greske pri dodavanju korisnika!' });
                });
            }
        })
    }
        // KorisnikModel.find().sort('id').limit(1).exec((err, val)=>{
        //     if(err) console.log(err);
        //     else {
        //         console.log(JSON.stringify(val[0].id));
        //         let id = JSON.stringify(val[0].id);
        //         let k = new KorisnikModel(req.body);
        //         k.id = id;
        
        //         k.save().then((kor)=> {
        //                     res.json({ "message" : "Korisnik je dodat!" });
        //                 }).catch((err) => {
        //                     res.json({'message' :'Doslo je do greske pri dodavanju korisnika!' });
        //                 });
        //             }

        //     })
    
        

    obrisiKorisnika = (req: express.Request, res: express.Response) =>{
        let kor_ime = req.body.kor_ime;

        KorisnikModel.deleteOne({'kor_ime' : kor_ime}, (err, k)=>{
            if(err) console.log(err);
            else res.json(k);
        })
    
    }

    azurirajKorisnika = (req: express.Request, res: express.Response) =>{
        let kor_ime_staro = req.body.kor_ime_staro;

       // let kor_ime = req.body.kor_ime;
        //let lozinka = req.body.lozinka; nema smisla
        let mejl = req.body.mejl;
        let telefon = req.body.telefon;
        let  ime = req.body.ime;
        let prezime = req.body.prezime;
        let naziv = req.body.naziv;
        let adresa = req.body.adresa;
        let opis = req.body.opis;
        let maticni_broj = req.body.maticni_broj;
        let slika = req.body.slika;
        //let slobodno = req.body.slobodno;

        KorisnikModel.updateOne({'kor_ime': kor_ime_staro}, {'ime': ime, 'prezime': prezime,
        'mejl': mejl, 'telefon': telefon, 'naziv': naziv, 'opis': opis, 'adresa': adresa, 'maticni_broj': maticni_broj, 'slika': slika 
           },(err, k)=>{
            if(err) console.log(err);
            else {
                res.json(k);
            }
           })
    }

    azurirajKlijenta = (req: express.Request, res: express.Response) =>{
        let kor_ime_staro = req.body.kor_ime_staro;

        let kor_ime = req.body.kor_ime;
        let ime= req.body.ime;
        let prezime = req.body.prezime;
        let mejl = req.body.mejl;
        let telefon = req.body.telefon;
        let slika = req.body.slika;

        KorisnikModel.updateOne({'kor_ime': kor_ime_staro}, {'kor_ime': kor_ime, 'ime': ime, 'prezime': prezime,
        'mejl': mejl, 'telefon': telefon, 'slika': slika},(err, k)=>{
            if(err) console.log(err);
            else {
                res.json(k);
            }
           })
    }

    azurirajAgenciju = (req: express.Request, res: express.Response) =>{
        let kor_ime_staro = req.body.kor_ime_staro;

        let kor_ime = req.body.kor_ime;
        let naziv = req.body.naziv;
        let adresa = req.body.adresa;
        let opis = req.body.opis;
        let mejl = req.body.mejl;
        let telefon = req.body.telefon;
        let slika = req.body.slika;
       // let slobodno = req.body.slobodno;

        KorisnikModel.updateOne({'kor_ime': kor_ime_staro}, {'kor_ime': kor_ime, 'naziv': naziv, 'opis': opis, 'adresa': adresa,
        'mejl': mejl, 'telefon': telefon, 'slika': slika},(err, k)=>{
            if(err) console.log(err);
            else {
                res.json(k);
            }
           })
    }

    dohvatiKorisnikaPoKorimenu = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime;

        KorisnikModel.findOne({'kor_ime': kor_ime}, (err, k)=>{
            if(err) console.log(err);
            else res.json(k);
        })
    }

    zahtevDodatnaMesta = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime
        let dodatno = req.body.dodatno;

        KorisnikModel.updateOne({'kor_ime': kor_ime}, {'dodatno': dodatno, 'zahtev': true}, (err, k)=>{
            if(err) console.log(err);
            else res.json(k);
        })
    }

    prihvatiZahtevDodatnaMesta = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime
        let dodatno = req.body.dodatno;

        KorisnikModel.updateOne({'kor_ime': kor_ime}, {'slobodno': dodatno, 'zahtev': false, 'dodatno': null}, (err, k)=>{
            if(err) console.log(err);
            else res.json(k);
        })
    }

    odbaciZahtevDodatnaMesta = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime
        //let dodatno = req.body.dodatno;

        KorisnikModel.updateOne({'kor_ime': kor_ime}, {'zahtev': false, 'dodatno': null}, (err, k)=>{
            if(err) console.log(err);
            else res.json(k);
        })
    }

    azurirajSlobodnaMesta = (req: express.Request, res: express.Response)=>{
        let kor_ime = req.body.kor_ime
        let slobodno = req.body.slobodno;

        KorisnikModel.updateOne({'kor_ime': kor_ime}, {'slobodno': slobodno}, (err, k)=>{
            if(err) console.log(err);
            else res.json(k);
        })
    }

}