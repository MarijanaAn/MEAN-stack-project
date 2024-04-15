import express from 'express';
import RadnikModel from '../models/radnik';

export class RadnikController {

    dohvatiRadnikaAgencije = (req: express.Request, res: express.Response) =>{
        let agencija = req.body.agencija;
    
        RadnikModel.find({'agencija': agencija}, (err, r)=>{
            if(err) console.log(err);
            else res.json(r);
            })
        }

        dohvatiSlobodneRadnikeAgencije = (req: express.Request, res: express.Response) =>{
            let agencija = req.body.agencija;
        
            RadnikModel.find({'agencija': agencija, 'zauzet': false}, (err, r)=>{
                if(err) console.log(err);
                else res.json(r);
                })
            }
    
        obrisiRadnika = (req: express.Request, res: express.Response) =>{//id nije unique
        
            let id = req.body.id;
    
            RadnikModel.deleteOne({'_id': id}, (err, o)=>{
                if(err) console.log(err);
                else res.json(o);
            })
        }
    
        azurirajRadnika = (req: express.Request, res: express.Response) =>{
            let id = req.body.id;
    
            let ime = req.body.ime;
            let prezime = req.body.prezime;
            let mejl = req.body.mejl;
            let telefon = req.body.telefon;
            let specijalizacija = req.body.specijalizacija;
            
            RadnikModel.updateOne({'_id': id}, {'ime': ime, 'prezime': prezime, 'mejl': mejl,
        'telefon': telefon, 'specijalizacija' : specijalizacija}, (err, o)=>{
                if(err) console.log(err);
                else res.json(o);
            })
    
        }
    
        dodajRadnika = (req: express.Request, res: express.Response) =>{
            let objekat = new RadnikModel(req.body);
                    
            objekat.save().then((o)=> {
                res.json({ 'message': "Radnik je dodat!" });
                 }).catch((err) => {
                res.json({'message' :'Doslo je do greske pri diodavanju radnika!' });
                });
        }

        dodajRadnikaIzBaze = (req: express.Request, res: express.Response) =>{
            let id = req.body.id;

            let agencija = req.body.agencija;

            RadnikModel.updateOne({'_id': id}, {'agencija' : agencija}, (err, o)=>{
                if(err) console.log(err);
                else res.json(o);
            })
        }

       zauzetostRadnika = (req: express.Request, res: express.Response) =>{
            let id = req.body.id;

            let zauzet = req.body.zauzet;

            RadnikModel.updateOne({'_id': id}, {'zauzet' : zauzet}, (err, o)=>{
                if(err) console.log(err);
                else res.json(o);
            })
        }

        azurirajAgencijuRadnika = (req: express.Request, res: express.Response) =>{
        let agencija_staro = req.body.agencija_staro;
        let agencija = req.body.agencija;

        RadnikModel.updateMany({'agencija': agencija_staro},{'agencija': agencija}, (err, resp)=>{
            if(err) console.log(err);
            else res.json(resp);
            })
        }

        obrisiAgencijuRadnika= (req: express.Request, res: express.Response) =>{
            let agencija = req.body.agencija;
    
            RadnikModel.deleteMany({'agencija': agencija}, (err, resp)=>{
                if(err) console.log(err);
                else res.json(resp);
                })
            }
}

