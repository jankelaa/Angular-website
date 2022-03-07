import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NekretninaService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';


  photos_upload(photos: File[]) {
    const fd = new FormData();
    for (let i = 0; i < photos.length; i++)
      fd.append('photos', photos[i], photos[i].name);
    return this.http.post(`${this.uri}/photos_upload`, fd)
  }

  nekretninePoGradovima(){
    return this.http.get(`${this.uri}/nekretninePoGradovima`);
  }

  odbijPonuduAgent(kupac, vlasnik, grad, opstina, ulica ,broj ,stan){
    const data = {      
      kupac: kupac,
      vlasnik: vlasnik,
      grad: grad,
      opstina: opstina,
      ulica: ulica,
      broj: broj,
      stan: stan
    }
    return this.http.post(`${this.uri}/odbijPonuduAgent`, data)
  }

  prihvatiPonuduAgent(kupac, vlasnik, cena, tip, grad, opstina, ulica ,broj ,stan){
    const data = {      
      kupac: kupac,
      vlasnik: vlasnik,
      cena:cena,
      tip:tip,
      grad: grad,
      opstina: opstina,
      ulica: ulica,
      broj: broj,
      stan: stan,
      potvrda: "finalizovano"
    }
    return this.http.post(`${this.uri}/prihvatiPonuduAgent`, data)
  }

  odbijPonuduUser(kupac, vlasnik, grad, opstina, ulica ,broj ,stan){
    const data = {      
      kupac: kupac,
      vlasnik: vlasnik,
      grad: grad,
      opstina: opstina,
      ulica: ulica,
      broj: broj,
      stan: stan
    }
    return this.http.post(`${this.uri}/odbijPonuduUser`, data)
  }

  prihvatiPonuduUser(kupac, vlasnik, grad, opstina, ulica ,broj ,stan){
    const data = {      
      kupac: kupac,
      vlasnik: vlasnik,
      grad: grad,
      opstina: opstina,
      ulica: ulica,
      broj: broj,
      stan: stan,
      potvrda: "potvrdjeno"
    }
    return this.http.post(`${this.uri}/prihvatiPonuduUser`, data)
  }

  dohvatiPonude(vlasnik, potvrda){
    const data = {
      vlasnik: vlasnik,
      potvrda: potvrda
    }
    return this.http.post(`${this.uri}/dohvatiPonude`, data)
  }

  dajPonudu(cena, tip, grad, opstina, ulica, broj, stan, vlasnik, kupac){
    const data = {
      kupac: kupac,
      vlasnik: vlasnik,
      grad: grad,
      opstina: opstina,
      tip: tip,  
      ulica: ulica,
      broj: broj,
      stan: stan,    
      cena: cena,
      potvrda: null
    }
    return this.http.post(`${this.uri}/dajPonudu`, data)
  }

  dohvatiNekretninu(grad, opstina, ulica, broj, stan){
    const data = {
      grad: grad,
      opstina: opstina,
      ulica: ulica,
      broj: broj,
      stan: stan
    }
    return this.http.post(`${this.uri}/dohvatiNekretninu`, data)
  }

  promovisiNekretninu(grad, opstina, ulica, broj, stan, promo) {
    const data = {
      grad: grad,
      opstina: opstina,
      ulica: ulica,
      broj: broj,
      stan: stan,
      promo: promo,
    }
    return this.http.post(`${this.uri}/promovisiNekretninu`, data)
  }

  pregledNekretnina(){
    return this.http.get(`${this.uri}/pregledNekretnina`)
  }

  pregledProdaja(){
    return this.http.get(`${this.uri}/pregledProdaja`)
  }

  zahteviZaNekretnine() {
    return this.http.get(`${this.uri}/zahteviZaNekretnine`);
  }

  listing_request(tip, opis, grad, opstina, ulica, broj, stan, sprat, spratnost, kvadratura,
    br_soba, namestenost, cena, vlasnik, promo, slike) {
    const data = {
      tip: tip,
      opis: opis,
      grad: grad,
      opstina: opstina,
      ulica: ulica,
      broj: broj,
      stan: stan,
      sprat: sprat,
      spratnost: spratnost,
      kvadratura: kvadratura,
      br_soba: br_soba,
      namestenost: namestenost,
      cena: cena,
      vlasnik: vlasnik,
      promo: promo,
      slike: slike
    }
    return this.http.post(`${this.uri}/listing_request`, data)
  }

  dodajNekretninu(tip, opis, grad, opstina, ulica, broj, stan, sprat, spratnost, kvadratura,
    br_soba, namestenost, cena, vlasnik, promo, slike) {
    const data = {
      tip: tip,
      opis: opis,
      grad: grad,
      opstina: opstina,
      ulica: ulica,
      broj: broj,
      stan: stan,
      sprat: sprat,
      spratnost: spratnost,
      kvadratura: kvadratura,
      br_soba: br_soba,
      namestenost: namestenost,
      cena: cena,
      vlasnik: vlasnik,
      promo: promo,
      slike: slike
    }
    return this.http.post(`${this.uri}/dodajNekretninu`, data)
  }

  odbijNekretninu(ulica, broj, stan, grad, opstina) {
    const data = {
      ulica: ulica,
      broj: broj,
      stan: stan,
      grad: grad,
      opstina: opstina
    }
    return this.http.post(`${this.uri}/odbijNekretninu`, data)
  }

  obrisiNekretninu(ulica, broj, grad, opstina, stan) {
    const data = {
      ulica: ulica,
      broj: broj,
      grad: grad,
      opstina: opstina,
      stan: stan
    }
    return this.http.post(`${this.uri}/obrisiNekretninu`, data)
  }

  dohvatiPromovisaneNekretnine() {
    return this.http.get(`${this.uri}/dohvatiPromovisaneNekretnine`);
  }

  gostPretraga(cenaOd: number, cenaDo: number, grad: string) {
    if (cenaOd == null) cenaOd = 0;
    if (cenaDo == null) cenaDo = Number.MAX_SAFE_INTEGER;
    const data = {
      cenaOd: cenaOd,
      cenaDo: cenaDo,
      grad: grad
    }
    return this.http.post(`${this.uri}/dohvatiNekretnineGost`, data);
  }

  mojeNekretnine(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/mojeNekretnine`, data);
  }

  azurirajNekretninu(OGgrad, OGopstina,OGulica,OGbroj,OGstan, opis, grad, opstina, ulica, broj, stan, sprat, spratnost, kvadratura,
    br_soba, namestenost, cena, slike){
      const data = {
        OGgrad:OGgrad,
        OGopstina:OGopstina,
        OGulica:OGulica,
        OGbroj:OGbroj,
        OGstan:OGstan,
        opis: opis,
        grad: grad,
        opstina: opstina,
        ulica: ulica,
        broj: broj,
        stan: stan,
        sprat: sprat,
        spratnost: spratnost,
        kvadratura: kvadratura,
        br_soba: br_soba,
        namestenost: namestenost,
        cena: cena,
        slike: slike
      }
      return this.http.post(`${this.uri}/azurirajNekretninu`, data)

  }
}
