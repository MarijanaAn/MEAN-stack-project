import express from 'express';
import IdsModel from '../models/ids';

export class IdsController{

    dohvatiIds = (req: express.Request, res: express.Response) =>{
        IdsModel.findOne({}, (err, val)=>{
            if(err) console.log(err);
            else res.json(val);
        })
    }

    incObjekat =  (req: express.Request, res: express.Response) =>{
        let objekti = req.body.objekti + 1;

        IdsModel.updateOne({"id": 1}, {"objekti" : objekti},(err, k)=>{
            if(err) console.log(err);
            else res.json(k);
        });
        
    }

    incKorisnik =  (req: express.Request, res: express.Response) =>{
        let korisnici = req.body.korisnici + 1;

        IdsModel.updateOne({"id": 1}, {"korisnici" : korisnici},(err, k)=>{
            if(err) console.log(err);
            else res.json(k);
        });
    }

    incRadnici =  (req: express.Request, res: express.Response) =>{
        let radnici = req.body.radnici + 1;

        IdsModel.updateOne({"id": 1}, {"radnici" : radnici},(err, k)=>{
            if(err) console.log(err);
            else res.json(k);
        });
    }

    incPoslovi =  (req: express.Request, res: express.Response) =>{
        let poslovi = req.body.poslovi + 1;

        IdsModel.updateOne({"id": 1}, {"poslovi" : poslovi},(err, k)=>{
            if(err) console.log(err);
            else res.json(k);
        });
    }
}