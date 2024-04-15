import express from 'express';
import ZahteviModel from '../models/zahtevi';

export class ZahteviController {

    dodajZahtev = (req: express.Request, res: express.Response) => {

        // ZahteviModel.find({},(err, res)=>{
        //     if(err) console.log(err);
        //     else {
        //         let id = res.length + 1;
        //         let zahtev = new ZahteviModel(req.body);
        //         zahtev.id = id;
        //         zahtev.save().then((agen)=> {
        //             res.json({ 'message': "Zahtev za registraciju je dodat!" });
        //             }).catch((e) => {
        //             res.json(e);
        //             })
        //     }
        // })

        ZahteviModel.find({}, (err, resp)=>{
            if(err) console.log(err);
            else {
                let id = resp.length + 1;
                let zahtev = new ZahteviModel(req.body);
                zahtev.id = id;
                zahtev.slobodno = 0;
                zahtev.save().then((z)=>{
                    res.json({'message': 'Zahtev je dodat!'})
                }).catch((err)=>{
                    res.json(err)
                })           
            }
        })
    }


    dohvatiZahteve = (req: express.Request, res: express.Response) => {
        ZahteviModel.find({}, (err, zah)=>{
            if(err) console.log(err);
            else res.json(zah);
        })
    }

    dohvatiZahtevPoKorimenu = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;

        ZahteviModel.findOne({'kor_ime' : kor_ime}, (err, zah)=>{
            if(err) console.log(err);
            else res.json(zah);
        })
    }

    prihvatiZahtev = (req: express.Request, res: express.Response) => {

    }

    obrisiZahtev = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime;

        ZahteviModel.deleteOne({'kor_ime': kor_ime},(err, r)=>{
            if(err) {
                console.log(err);
            }else {
                res.json(r);
            }
        })
    }
}