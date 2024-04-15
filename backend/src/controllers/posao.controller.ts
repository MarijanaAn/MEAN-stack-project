import express from 'express';
import PosaoModel from '../models/posao';

export class PosaoController{

traziSaradnju = (req: express.Request, res: express.Response) =>{

    let p = new PosaoModel();
    p.klijent = req.body.klijent;
    p.agencija = req.body.agencija;
    p.objekat = req.body.objekat;
    p.vreme = req.body.vreme;
    p.status = "zahtev za saradnju";

    p.save().then((kor)=> {
        res.json({ "message" : "Zahtev je poslat!" });
    }).catch((err) => {
        res.json({'message' :'Doslo je do greske pri slanju zahteva!' });
    });
}

prihvatiZahtev = (req: express.Request, res: express.Response) =>{
    let id = req.body.id;
    let ponuda = req.body.ponuda;

    PosaoModel.updateOne({'_id': id}, {'ponuda' : ponuda, 'zahtev' : 'prihvacen', 'status': 'ponuda'} , (err, p)=>{
        if(err) console.log(err);
        else res.json(p);
    })

}

odbijZahtev= (req: express.Request, res: express.Response) =>{
    let id = req.body.id;

    PosaoModel.updateOne({'_id': id}, {'zahtev' : 'odbijen'}, (err, p)=>{
        if(err) console.log(err);
        else res.json(p);
    })

}

prihvatiPonudu = (req: express.Request, res: express.Response) =>{
    let id = req.body.id;

    PosaoModel.updateOne({'_id': id}, {'status' : 'aktivan'}, (err, p)=>{
        if(err) console.log(err);
        else res.json(p);
    })
} 

odbijPonudu = (req: express.Request, res: express.Response) =>{
    let id = req.body.id;

    PosaoModel.deleteOne({'_id': id}, (err, p)=>{
        if(err) console.log(err);
        else res.json(p);
    })
}

zavrsiPosao = (req: express.Request, res: express.Response) =>{
    let id = req.body.id;

    PosaoModel.updateOne({'_id': id}, {'status' : "zavrsen"}, (err, p)=>{
        if(err) console.log(err);
        else res.json(p);
    })
}

zavrseniPoslovi = (req: express.Request, res: express.Response) =>{
    PosaoModel.find({'status' : "zavrsen"}, (err, p)=>{
        if(err) console.log(err);
        else res.json(p);
    })
}

aktivniPosloviAgencije = (req: express.Request, res: express.Response) =>{

    let agencija = req.body.agencija;
    PosaoModel.find({'status' : "aktivan", "agencija" : agencija}, (err, p)=>{
        if(err) console.log(err);
        else res.json(p);
    })
}

dohvatiPosloveKlijenta = (req: express.Request, res: express.Response) =>{
    let klijent = req.body.klijent;

    PosaoModel.find({'klijent' : klijent}, (err, p)=>{
        if(err) console.log(err);
        else res.json(p);
    })
}

dohvatiZahteveAgencije = (req: express.Request, res: express.Response) =>{
    let agencija = req.body.agencija;

    PosaoModel.find({'agencija' : agencija, /*'zahtev' : null*/ 'status': 'zahtev za saradnju'}, (err, p)=>{
        if(err) console.log(err);
        else res.json(p);
    })
}

dohvatiZahteveKlijenta = (req: express.Request, res: express.Response) =>{
    let klijent = req.body.klijent;

    PosaoModel.find({'klijent' : klijent, 'status' : 'ponuda', 'zahtev' : {$ne: null}}, (err, p)=>{
        if(err) console.log(err);
        else res.json(p);
    })
}

dohvatiPoslove = (req: express.Request, res: express.Response) =>{

    PosaoModel.find({/*{'status' : {$ne: null}*/}, (err, p)=>{
        if(err) console.log(err);
        else res.json(p);
    })
}

nedovoljoRadnika = (req: express.Request, res: express.Response) =>{ 
    let id = req.body.id;
    let nedovoljno = req.body.nedovoljno;

    PosaoModel.updateOne({'_id': id}, {'nedovoljno' : nedovoljno}, (err, p)=>{
        if(err) console.log(err);
        else res.json(p);
    })
}

dodajRadnike = (req: express.Request, res: express.Response) =>{ 
    let id = req.body.id;
    let radnici = req.body.radnici;

    PosaoModel.updateOne({'_id': id}, {'radnici' : radnici}, (err, p)=>{
        if(err) console.log(err);
        else res.json(p);
    })
}

dohvatiPosaoPoId =  (req: express.Request, res: express.Response) =>{ 
    let id = req.body.id;

    PosaoModel.findOne({'_id': id}, (err, p)=>{
        if(err) console.log(err);
        else res.json(p);
    })
}

azurirajAgencijuPosla = (req: express.Request, res: express.Response) =>{
    let agencija_staro = req.body.agencija_staro;
    let agencija = req.body.agencija;

    PosaoModel.updateMany({'agencija': agencija_staro},{'agencija': agencija}, (err, resp)=>{
        if(err) console.log(err);
        else res.json(resp);
        })
    }

    azurirajKlijentaPosla = (req: express.Request, res: express.Response) =>{
        let klijent_staro = req.body.klijent_staro;
        let klijent = req.body.klijent;
    
        PosaoModel.updateMany({'klijent': klijent_staro},{'klijent': klijent}, (err, resp)=>{
            if(err) console.log(err);
            else res.json(resp);
            })
        }

        obrisiPosloveKlijenta = (req: express.Request, res: express.Response) =>{
            let klijent = req.body.klijent;
        
            PosaoModel.deleteMany({'klijent': klijent}, (err, resp)=>{
                if(err) console.log(err);
                else res.json(resp);
                })
            }

    obrisiPosloveAgencije = (req: express.Request, res: express.Response) =>{
        
        let agencija = req.body.agencija;
            
        PosaoModel.deleteMany({'agencija': agencija}, (err, resp)=>{
            if(err) console.log(err);
            else res.json(resp);
            })
        }

    dohvatiPosloveObjekta = (req: express.Request, res: express.Response) =>{
        let objekat = req.body.objekat;

        PosaoModel.find({'objekat': objekat}, (err, resp)=>{
            if(err) console.log(err);
        else res.json(resp);
        })
    }

    zahtevZaOtkazivanje = (req: express.Request, res: express.Response) =>{
        let id = req.body.id;
        let razlog = req.body.razlog;

        PosaoModel.updateOne({'_id': id}, {'razlog': razlog}, (err, resp)=>{
            if(err) console.log(err);
            else res.json(resp);
            })
    }

    otkaziPosao = (req: express.Request, res: express.Response) =>{
        let id = req.body.id;

        PosaoModel.updateOne({'_id': id}, {'status': 'otkazan'}, (err, resp)=>{
            if(err) console.log(err);
            else res.json(resp);
            })
    }

    odbijOtkazivanjePosla = (req: express.Request, res: express.Response) =>{
        let id = req.body.id;

        PosaoModel.updateOne({'_id': id}, {'razlog': null}, (err, resp)=>{
            if(err) console.log(err);
            else res.json(resp);
            })
    }

    dohvatiZahteveZaOtkazivanje = (req: express.Request, res: express.Response) =>{

        PosaoModel.find({'razlog': {$ne: null}, 'status': {$ne: 'otkazan'}}, (err, resp)=>{
            if(err) console.log(err);
            else res.json(resp);
            })
    }

    dohvatiPosloveOdredjenogStatusa = (req: express.Request, res: express.Response) =>{
        let status = req.body.status;

        PosaoModel.find({'status': status}, (err, resp)=>{
            if(err) console.log(err);
            else res.json(resp);
            })
    }

}