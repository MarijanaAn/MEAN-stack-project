import express from 'express';
import RecenzijaModel from '../models/recenzija';


export class RecenzijaController{

    dohvatiRecenzije = (req: express.Request, res: express.Response) => {
        let agencija = req.body.agencija;

        RecenzijaModel.find({'agencija': agencija}, (err, resp)=>{
            if(err) console.log(err);
            else res.json(resp);
        })

    }

    dohtaviRecenzijuKlijenta= (req: express.Request, res: express.Response) => {
        let klijent = req.body.klijent;
        let agencija = req.body.agencija;

        RecenzijaModel.findOne({'klijent': klijent,'agencija' : agencija}, (err, resp)=>{
            if(err) console.log(err);
            else res.json(resp);
        })
    }

    azurirajRecenziju = (req: express.Request, res: express.Response) => {
        let klijent = req.body.klijent;
        let agencija = req.body.agencija;

        let ocena = req.body.ocena;
        let komentar= req.body.komentar;

        RecenzijaModel.updateOne({'klijent': klijent,'agencija' : agencija},{'ocena': ocena, 'komentar' : komentar}, (err, resp)=>{
            if(err) console.log(err);
            else res.json(resp);
        })

    }

    obrisiRecenziju = (req: express.Request, res: express.Response) => {
        let klijent = req.body.klijent;
        let agencija = req.body.agencija;

        RecenzijaModel.deleteOne({'klijent': klijent,'agencija' : agencija}, (err, resp)=>{
            if(err) console.log(err);
            else res.json(resp);
        })

    }

    dodajRecenziju = (req: express.Request, res: express.Response) => {
        let k = new RecenzijaModel();
          k.klijent = req.body.klijent;
          k.agencija = req.body.agencija;
          k.ocena = req.body.ocena;
          k.komentar = req.body.komentar;      

        k.save().then((recenzija)=> {
                    res.json({ "message" : "Ostavljena!" });
                }).catch((err) => {
                    console.log(err);
                    res.json({'message' :'Greska!' });
                });
            }

    azurirajRecenzijuKlijenta = (req: express.Request, res: express.Response) => {
        let klijent_staro = req.body.klijent_staro;
        let klijent = req.body.klijent;
        
        RecenzijaModel.updateMany({'klijent': klijent_staro},{'klijent': klijent}, (err, resp)=>{
            if(err) console.log(err);
            else res.json(resp);
            })
        
        }

        azurirajRecenzijuAgencije = (req: express.Request, res: express.Response) => {
            let agencija_staro = req.body.agencija_staro;
            let agencija = req.body.agencija;
            
            RecenzijaModel.updateMany({'agencija': agencija_staro},{'agencija': agencija}, (err, resp)=>{
                if(err) console.log(err);
                else res.json(resp);
                })
            
            }

            obrisiRecenzijeKlijenta = (req: express.Request, res: express.Response) => {
                let klijent = req.body.klijent;
                
                RecenzijaModel.deleteMany({'klijent': klijent}, (err, resp)=>{
                    if(err) console.log(err);
                    else res.json(resp);
                    })
                
                }
        
        obrisiRecenzijuAgencije = (req: express.Request, res: express.Response) => {
            
            let agencija = req.body.agencija;
                    
            RecenzijaModel.deleteMany({'agencija': agencija}, (err, resp)=>{
                if(err) console.log(err);
                else res.json(resp);
                })
                    
            }
}