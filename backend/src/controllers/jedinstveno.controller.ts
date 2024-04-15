import express from 'express';
import JedinstvenoModel from '../models/jedinstveno';


export class JedinstvenoController{


mejlZauzet= (req: express.Request, res: express.Response) => {
    let mejl = req.body.mejl;

    JedinstvenoModel.find({'mejl' : mejl}, (err, kor) => {
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

    JedinstvenoModel.find({'kor_ime' : kor_ime}, (err, kor) => {
        if(err) console.log(err);
        else{
            console.log(kor);
            if(kor.length == 0) res.json({'message' : 'jeste'});
            else res.json({'message': 'nije'})
        }
    })
}

dodaj = (req: express.Request, res: express.Response) => {
    let j = new JedinstvenoModel(req.body);

    j.save().then((jed)=> {
        res.json({ 'message': "Dodato!" });
        }).catch((err) => {
        res.json(400).json({'message' :'Doslo je do greske!' });
        });

    
}

azurirajKorimeIMejl = (req: express.Request, res: express.Response) => {
    let kor_ime_staro = req.body.kor_ime_staro;

    let kor_ime = req.body.kor_ime;
    let mejl = req.body.mejl;

    JedinstvenoModel.updateOne({'kor_ime': kor_ime_staro}, {'mejl': mejl, 'kor_ime': kor_ime}, (err, j)=>{
        if(err) console.log(err);
        else {
            res.json(j);
        }
    })
}

azurirajMejl = (req: express.Request, res: express.Response) => {
    let kor_ime = req.body.kor_ime;

    let mejl = req.body.mejl;

    JedinstvenoModel.updateOne({'kor_ime': kor_ime}, {'mejl': mejl}, (err, j)=>{
        if(err) console.log(err);
        else {
            res.json(j);
        }
    })
}

azurirajStariMejl = (req: express.Request, res: express.Response) => {
    let mejl_stari = req.body.mejl_stari;

    let mejl = req.body.mejl;

    JedinstvenoModel.updateOne({'mejl': mejl_stari}, {'mejl': mejl}, (err, j)=>{
        if(err) console.log(err);
        else {
            res.json(j);
        }
    })
}

}