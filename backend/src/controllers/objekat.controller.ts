import express from 'express';
import ObjekatModel from '../models/objekat';

export class ObjekatController {

    dohvatiObjekteKlijenta = (req: express.Request, res: express.Response) =>{
    let klijent = req.body.klijent;

    ObjekatModel.find({'klijent': klijent}, (err, o)=>{
        if(err) console.log(err);
        else res.json(o);
        })
    }

    azurirajObjekteKlijenta = (req: express.Request, res: express.Response) =>{
        let klijent_staro = req.body.klijent_staro;
        let klijent = req.body.klijent;
        
        ObjekatModel.updateMany({'klijent': klijent_staro},{'klijent': klijent}, (err, resp)=>{
            if(err) console.log(err);
            else res.json(resp);
            })
        }

        obrisiObjekteKlijenta = (req: express.Request, res: express.Response) =>{
            let klijent = req.body.klijent;
            
            ObjekatModel.deleteMany({'klijent': klijent}, (err, resp)=>{
                if(err) console.log(err);
                else res.json(resp);
                })
            }

    obrisiObjekat = (req: express.Request, res: express.Response) =>{
    
        let id = req.body.id;

        ObjekatModel.deleteOne({'_id': id}, (err, o)=>{
            if(err) console.log(err);
            else res.json(o);
        })
    }

    azurirajObjekat = (req: express.Request, res: express.Response) =>{
        let id = req.body.id;

        let tip = req.body.tip;
        let adresa = req.body.adresa;
        let broj_prostorija = req.body.broj_prostorija;
        let kvadratura = req.body.kvadratura;
        let skica = req.body.skica;
       // let klijent = req.body.klijent;
        
        ObjekatModel.updateOne({'_id': id}, {'tip': tip, 'adresa': adresa, 'broj_prostorija': broj_prostorija,
    'kvadratura': kvadratura, 'skica': skica}, (err, o)=>{
            if(err) console.log(err);
            else res.json(o);
        })

    }

    dodajObjekat = (req: express.Request, res: express.Response) =>{
        
                let objekat = new ObjekatModel(req.body);
            
                objekat.save().then((o)=> {
                    res.json({ 'message': "Objekat je dodat!" });
                    }).catch((err) => {
                    res.json(400).json({'message' :'Doslo je do greske pri diodavanju objekta!' });
                    });
            }

    dohvatiObjekatPoid = (req: express.Request, res: express.Response) =>{
        let id = req.body.id;

        ObjekatModel.findOne({ '_id': id}, (err, o)=>{
            if(err) console.log(err);
            else res.json(o);
        })
    }

    zapocniSobu = (req: express.Request, res: express.Response) =>{
        let id = req.body.id;
        let soba = req.body.soba;
        ObjekatModel.findOne({ '_id': id}, (err, o)=>{
            if(err) console.log(err);
            else {
                if(o){
                    ObjekatModel.updateOne({'skica.id' : soba, "_id" : id}, {$set : {"skica.$.zapoceta": true}}, (err, p)=>{
                        if(err) console.log(err);
                        else ObjekatModel.findOne({'_id': id}, (err, obj)=>{
                            if(err) console.log(err);
                            else res.json(obj);
                        })
                    })
                }
            }
        })
    }

    zavrsiSobu = (req: express.Request, res: express.Response) =>{
        let id = req.body.id;
        let soba = req.body.soba;
        ObjekatModel.findOne({ '_id': id}, (err, o)=>{
            if(err) console.log(err);
            else {
                console.log("Nadjen objekat");
                if(o){
                    ObjekatModel.updateOne({'skica.id' : soba, "_id" : id},{$set : {"skica.$.zavrsena": true}},  (err, r)=>{
                        if(err) console.log(err);
                        else {
                            
                            ObjekatModel.findOne({'_id': id}, (err, obj)=>{
                            if(err) console.log(err);
                            else {res.json(obj);
                           
                            }
                        })
                    }
                    })
                }
            }
        })
    }

    vratiSobuNainicijalno = (req: express.Request, res: express.Response) =>{
        let id = req.body.id;
        let soba = req.body.soba;
        ObjekatModel.findOne({ '_id': id}, (err, o)=>{
            if(err) console.log(err);
            else {
                if(o){
                    ObjekatModel.updateOne({'skica.id' : soba, "_id" : id}, {$set : {"skica.$.zavrsena": false, "skica.$.zapoceta": false}}, (err, o)=>{
                        if(err) console.log(err);
                        else res.json(o);
                    })
                }
            }
        })
    }

}