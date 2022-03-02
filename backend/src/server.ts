import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import user from './model/user';
import register_request from './model/register_request';
import nekretnina from './model/nekretnina';
import listing_request from './model/listing_request';
import purchase_request from './model/purchase_request';
import purchase from './model/purchase';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/pia_jul');

const conn = mongoose.connection;

conn.once('open', () => {
    console.log('mongo open');
})

const router = express.Router();

var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, './../frontend/app/src/assets/photos')
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

app.post('/photo_upload', upload.single('photo'), (req, res) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.status(200).json({ "photo": "ok" });
})

app.post('/photos_upload', upload.array('photos'), (req, res) => {

    res.status(200).json({ "slike": "ok" })
})

/*
app.route('/nekretninePoGradovima').get((req, res) => {
    const nekretninePoGradovima= nekretnina.distinct("grad")
    res.json(nekretninePoGradovima)
});
*/
router.route('/checkEmail').post((req, res) => {
    let email = req.body.email
    user.findOne({ 'email': email }, (err, email_usr) => {
        if (email_usr == null) {
            register_request.findOne({ 'email': email }, (err, email_req) => {
                if (email_req == null) {
                    res.json({ 'email': 'ok' });
                } else {
                    res.json({ 'email': 'no' });
                }
            });
        } else {
            res.json({ 'email': 'no' });
        }
    });
});

router.route('/azurirajProfil').post((req, res) => {
    let username = req.body.username;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let city = req.body.city;
    let country = req.body.country;
    let type = req.body.type;
    let photo = req.body.photo;
    let emailValidate = req.body.emailValidate
    if (!emailValidate) {
        user.collection.updateOne({ "username": username }, {
            $set: {
                "firstname": firstname, "lastname": lastname,
                "city": city, "country": country, "type": type, "photo": photo
            }
        }, (r) => {
            res.json({ 'user': 'ok' });
        });
    }else{
        user.findOne({ 'email': email }, (err, email_usr) => {
            if (email_usr == null) {
                register_request.findOne({ 'email': email }, (err, email_req) => {
                    if (email_req == null) {
                        user.collection.updateOne({ "username": username }, {
                            $set: {
                                "firstname": firstname, "lastname": lastname, "email":email,
                                "city": city, "country": country, "type": type, "photo": photo
                            }
                        }, (r) => {
                            res.json({ 'user': 'ok','email':'ok' });
                        });
                    } else {
                        res.json({ 'user':'no','email': 'no' });
                    }
                });
            } else {
                res.json({ 'user':'no','email': 'no' });
            }
        });
    }
});

router.route('/login').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    user.findOne({ 'username': username, 'password': password }, (err, user) => {
        if (err) console.log(err);
        else res.json(user);
    })
});


router.route('/odbijPonuduAgent').post((req, res) => {
    let kupac = req.body.kupac;
    let vlasnik = req.body.vlasnik;
    let ulica = req.body.ulica;
    let broj = req.body.broj;
    let stan = req.body.stan;
    let grad = req.body.grad;
    let opstina = req.body.opstina;

    purchase_request.deleteOne({
        "kupac": kupac, "vlasnik": vlasnik, "ulica": ulica, "broj": broj, "stan": stan,
        "grad": grad, "opstina": opstina
    }, (err) => {
        res.json(err);
        if (err) console.log(err);
    });
});

router.route('/prihvatiPonuduAgent').post((req, res) => {
    let grad = req.body.grad
    let opstina = req.body.opstina
    let ulica = req.body.ulica
    let broj = req.body.broj
    let stan = req.body.stan
    nekretnina.deleteOne({ "grad": grad, "opstina": opstina, "ulica": ulica, "broj": broj, "stan": stan })
    const query = { "grad": grad, "opstina": opstina, "ulica": ulica, "broj": broj, "stan": stan };
    purchase_request.deleteMany(query)
    let kupovina = new purchase(req.body);
    kupovina.save().then(u => {
        res.status(200).json({ 'kupovina': 'ok', 'msg': '' });
    }).catch(err => {
        res.status(400).json({ 'kupovina': 'no', 'msg': 'Kupovina nije uspela' });
    });
});

router.route('/odbijPonuduUser').post((req, res) => {
    let kupac = req.body.kupac;
    let vlasnik = req.body.vlasnik;
    let ulica = req.body.ulica;
    let broj = req.body.broj;
    let stan = req.body.stan;
    let grad = req.body.grad;
    let opstina = req.body.opstina;

    purchase_request.deleteOne({
        "kupac": kupac, "vlasnik": vlasnik, "ulica": ulica, "broj": broj, "stan": stan,
        "grad": grad, "opstina": opstina
    }, (err) => {
        res.json(err);
        if (err) console.log(err);
    });
});

router.route('/prihvatiPonuduUser').post((req, res) => {
    let kupac = req.body.kupac;
    let vlasnik = req.body.vlasnik;
    let ulica = req.body.ulica;
    let broj = req.body.broj;
    let grad = req.body.grad;
    let opstina = req.body.opstina;
    let stan = req.body.stan;

    purchase_request.collection.updateOne({
        "kupac": kupac, "vlasnik": vlasnik, "ulica": ulica, "broj": broj,
        "grad": grad, "opstina": opstina, "stan": stan
    }, {
        $set: {
            "potvrda": "potvrdjeno"
        }
    }, (r) => {
        res.json({ 'ponuda': 'ok' });
    });
});

router.route('/dohvatiPonude').post((req, res) => {
    let potvrda = req.body.potvrda
    let vlasnik = req.body.vlasnik
    if (potvrda) {
        purchase_request.find({ $or: [{ "vlasnik": vlasnik }, { "potvrda": "potvrdjeno" }] }, function (err, data) {
            if (err) console.log(err);
            else res.json(data);
        })
    } else {
        purchase_request.find({ "vlasnik": vlasnik, "potvrda": null }, function (err, data) {
            if (err) console.log(err);
            else res.json(data);
        })
    }
});

router.route('/dajPonudu').post((req, res) => {
    let kupac = req.body.kupac
    let vlasnik = req.body.vlasnik
    let grad = req.body.grad
    let opstina = req.body.opstina
    let ulica = req.body.ulica
    let broj = req.body.broj
    let stan = req.body.stan
    purchase_request.findOne({
        "kupac": kupac, "vlasnik": vlasnik, "grad": grad, "opstina": opstina, "ulica": ulica,
        "broj": broj, "stan": stan
    }, (err, kupovao) => {
        if (kupovao == null) {
            let ponuda = new purchase_request(req.body);
            ponuda.save().then(u => {
                res.status(200).json({ 'ponuda': 'ok', 'msg': '' });
            }).catch(err => {
                res.status(400).json({ 'ponuda': 'no', 'msg': 'Ponuda nije prosla!' });
            });
        } else {
            res.json({ 'ponuda': 'no', 'msg': 'Vec ste dali ponudu za ovu nekretninu!' })
        }
    })

});

router.route('/register_request').post((req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    user.findOne({ 'username': username }, (err, name_reg) => {
        if (name_reg == null) {
            register_request.findOne({ 'username': username }, (err, name_req) => {
                if (name_req == null) {
                    user.findOne({ 'email': email }, (err, email_reg) => {
                        if (email_reg == null) {
                            register_request.findOne({ 'email': email }, (err, email_req) => {
                                if (email_req == null) {
                                    let u = new register_request(req.body);
                                    u.save().then(u => {
                                        res.status(200).json({ 'user': 'ok', 'msg': '' });
                                    }).catch(err => {
                                        res.status(400).json({ 'user': 'no', 'msg': '' });
                                    });
                                } else {
                                    res.json({ 'user': 'no', 'msg': 'E-mail je zauzet!' });
                                }
                            });
                        } else {
                            res.json({ 'user': 'no', 'msg': 'E-mail je zauzet!' });
                        }
                    });
                } else {
                    res.json({ 'user': 'no', 'msg': 'Korisnicko ime je zauzeto!' });
                }
            });
        } else {
            res.json({ 'user': 'no', 'msg': 'Korisnicko ime je zauzeto!' });
        }
    });
});

router.route('/dodajKorisnika').post((req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    user.findOne({ 'username': username }, (err, name_reg) => {
        if (name_reg == null) {
            register_request.findOne({ 'username': username }, (err, name_req) => {
                if (name_req == null) {
                    user.findOne({ 'email': email }, (err, email_reg) => {
                        if (email_reg == null) {
                            register_request.findOne({ 'email': email }, (err, email_req) => {
                                if (email_req == null) {
                                    let u = new user(req.body);
                                    u.save().then(u => {
                                        res.status(200).json({ 'user': 'ok', 'msg': '' });
                                    }).catch(err => {
                                        res.status(400).json({ 'user': 'no', 'msg': 'Neuspela registracija.' });
                                    });
                                } else {
                                    res.json({ 'user': 'no', 'msg': 'E-mail je zauzet!' });
                                }
                            });
                        } else {
                            res.json({ 'user': 'no', 'msg': 'E-mail je zauzet!' });
                        }
                    });
                } else {
                    res.json({ 'user': 'no', 'msg': 'Korisnicko ime je zauzeto!' });
                }
            });
        } else {
            res.json({ 'user': 'no', 'msg': 'Korisnicko ime je zauzeto!' });
        }
    });
});

router.route('/dohvatiPromovisaneNekretnine').get((req, res) => {
    nekretnina.find({ "promo": true }, (err, nekretnine) => {
        if (err) console.log(err);
        else res.json(nekretnine);
    })
});

router.route('/dohvatiNekretnineGost').post((req, res) => {
    let cenaOd = req.body.cenaOd;
    let cenaDo = req.body.cenaDo;
    let grad = req.body.grad;

    if (grad != "") {
        nekretnina.find({ "grad": grad, "cena": { $gte: cenaOd, $lte: cenaDo } }, (err, nekretnine) => {
            if (err) console.log(err);
            else res.json(nekretnine);
        })
    } else {
        nekretnina.find({ "cena": { $gte: cenaOd, $lte: cenaDo } }, (err, nekretnine) => {
            if (err) console.log(err);
            else res.json(nekretnine);
        })
    }
});

router.route('/dohvatiSveKorisnike').get((req, res) => {
    user.find({}, (err, korisnici) => {
        if (err) console.log(err);
        else res.json(korisnici);
    })
});

router.route('/zahteviZaRegistraciju').get((req, res) => {
    register_request.find({}, (err, korisnici) => {
        if (err) console.log(err);
        else res.json(korisnici);
    })
});

router.route('/zahteviZaNekretnine').get((req, res) => {
    listing_request.find({}, (err, nekretnine) => {
        if (err) console.log(err);
        else res.json(nekretnine);
    })
});

router.route('/pregledNekretnina').get((req, res) => {
    nekretnina.find({}, (err, nekretnine) => {
        if (err) console.log(err);
        else res.json(nekretnine);
    })
});

router.route('/pregledProdaja').get((req, res) => {
    purchase.find({}, (err, prodaje) => {
        if (err) console.log(err);
        else res.json(prodaje);
    })
});

router.route('/promovisiNekretninu').post((req, res) => {
    let ulica = req.body.ulica;
    let broj = req.body.broj;
    let grad = req.body.grad;
    let opstina = req.body.opstina;
    let stan = req.body.stan;

    nekretnina.collection.updateOne({ "ulica": ulica, "broj": broj, "grad": grad, "opstina": opstina, "stan": stan }, {
        $set: {
            "promo": !req.body.promo
        }
    }, (r) => {
        res.json(r);
    });
});

router.route('/obrisiKorisnika').post((req, res) => {
    let username = req.body.username;
    user.deleteOne({ "username": username }, (err) => {
        res.json(err);
        if (err) console.log(err);
    });

    const query = { "vlasnik": username }
    listing_request.deleteMany(query)
    nekretnina.deleteMany(query)
    purchase_request.deleteMany(query)
});

router.route('/obrisiKorisnikaIzZahteva').post((req, res) => {
    let username = req.body.username;
    register_request.deleteOne({ "username": username }, (err) => {
        res.json(err);
        if (err) console.log(err);
    });
});

router.route('/odbijKorisnika').post((req, res) => {
    let username = req.body.username;
    register_request.deleteOne({ "username": username }, (err) => {
        res.json(err);
        if (err) console.log(err);
    });
});

router.route('/dohvatiKorisnika').post((req, res) => {
    let username = req.body.username;

    user.findOne({ "username": username }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    })
});

router.route('/azurirajNekretninu').post((req, res) => {
    let grad = req.body.OGgrad
    let opstina = req.body.OGopstina
    let ulica = req.body.OGulica
    let broj = req.body.OGbroj
    let stan = req.body.OGstan
    nekretnina.collection.updateOne({ 'grad': grad, "opstina":opstina,"ulica":ulica,"broj":broj,"stan":stan }, {
        $set: {
            "grad": req.body.grad,
            "opstina": req.body.opstina,
            "ulica": req.body.ulica,
            "broj": req.body.broj,
            "city": req.body.city,
            "stan": req.body.stan,
            "type": req.body.type,
            "photo": req.body.photo,
            "opis": req.body.opis,
            "sprat": req.body.sprat,
            "spratnost": req.body.spratnost,
            "kvadratura": req.body.kvadratura,
            "br_soba": req.body.br_soba,
            "namestenost": req.body.namestenost,
            "cena": req.body.cena,
            "slike": req.body.slike
        }
    }, (r) => {
        res.json(r);
    });
});

router.route('/azurirajProfil').post((req, res) => {
    let username = req.body.username;
    user.collection.updateOne({ 'username': username }, {
        $set: {
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
            "password": req.body.password,
            "email": req.body.email,
            "city": req.body.city,
            "country": req.body.country,
            "type": req.body.type,
            "photo": req.body.photo
        }
    }, (r) => {
        res.json(r);
    });

    let type = req.body.type
    if (type == "agent") {
        const query = { "vlasnik": username }
        nekretnina.updateMany(query, {
            $set: { "vlasnik": "agencija" }
        })
        purchase_request.updateMany(query, {
            $set: { "vlasnik": "agencija" }
        })
    }
});

router.route('/promenaLozinke').post((req, res) => {
    let username = req.body.username;
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    user.findOne({ "username": username, "password": oldPassword }, (err, korisnik) => {
        if (err) {
            console.log(err);
            res.json({ 'user': 'no', 'msg': 'Uneta stara lozinka nije dobra!' });
        }
        else if (korisnik != null) {
            user.collection.updateOne({ "username": username }, {
                $set: {
                    "password": newPassword
                }
            })
            res.json({ 'user': 'ok' })
        } else {
            res.json({ 'user': 'no', 'msg': 'Uneta stara lozinka nije dobra!' });
        }
    })
});

router.route('/mojeNekretnine').post((req, res) => {
    let username = req.body.username
    nekretnina.find({ "vlasnik": username }, (err, nekretnine) => {
        if (err) console.log(err);
        else res.json(nekretnine);
    })
});

router.route('/obrisiNekretninu').post((req, res) => {
    let ulica = req.body.ulica;
    let broj = req.body.broj;
    let grad = req.body.grad;
    let opstina = req.body.opstina;
    let stan = req.body.stan;
    nekretnina.deleteOne({ "ulica": ulica, "broj": broj, "grad": grad, "opstina": opstina, "stan": stan }, (err) => {
        res.json(err);
        if (err) console.log(err);
    });
});

router.route('/odbijNekretninu').post((req, res) => {
    let ulica = req.body.ulica;
    let broj = req.body.broj;
    let grad = req.body.grad;
    let opstina = req.body.opstina;
    let stan = req.body.stan;
    listing_request.deleteOne({ "ulica": ulica, "broj": broj, "grad": grad, "opstina": opstina, "stan": stan }, (err) => {
        res.json(err);
        if (err) console.log(err);
    });
});


router.route('/listing_request').post((req, res) => {
    let listing = new listing_request(req.body);
    listing.save().then(u => {
        res.status(200).json({ 'nekretnina': 'ok', 'msg': '' });
    }).catch(err => {
        res.status(400).json({ 'nekretnina': 'no', 'msg': 'Dodavanje nekretnine nije uspelo' });
    });
});


router.route('/dodajNekretninu').post((req, res) => {
    let listing = new nekretnina(req.body);
    listing.save().then(u => {
        res.status(200).json({ 'nekretnina': 'ok', 'msg': '' });
    }).catch(err => {
        res.status(400).json({ 'nekretnina': 'no', 'msg': 'Dodavanje nekretnine nije uspelo' });
    });
});

router.route('/dohvatiNekretninu').post((req, res) => {
    let ulica = req.body.ulica
    let broj = req.body.broj
    let stan = req.body.stan
    let grad = req.body.grad
    let opstina = req.body.opstina
    nekretnina.findOne({ "ulica": ulica, "broj": broj, "stan": stan, "grad": grad, "opstina": opstina }, (err, nekretnina) => {
        if (err)
            console.log(err);
        else
            res.json(nekretnina);
    })
})



app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));