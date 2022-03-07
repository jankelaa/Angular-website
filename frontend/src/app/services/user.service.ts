import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri='http://localhost:4000'

  login(username, password){
    const data = {
      username: username,
      password: password
    }

    return this.http.post(`${this.uri}/login`,data);
  }

  register_request(firstname, lastname, username, password, email, city, country, photo){
    const data = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      email: email,
      city: city,
      country: country,
      type: "user",
      photo: photo
    }

    return this.http.post(`${this.uri}/register_request`,data);
  }
  dodajKorisnika(firstname, lastname, username, password, email, city, country, type, photo){
    const data = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      email: email,
      city: city,
      country: country,   
      type: type,   
      photo: photo
    }

    return this.http.post(`${this.uri}/dodajKorisnika`,data);
  }

  checkEmail(email){
    const data = {
      email:email
    }
    return this.http.post(`${this.uri}/checkEmail`,data);
  }

  azurirajProfil(username, firstname, lastname, email, city, country, type, photo, emailValidate){
    const data = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
      city: city,
      country: country,   
      type: type,   
      photo: photo,
      emailValidate
    }

    return this.http.post(`${this.uri}/azurirajProfil`,data);
  }

  photo_upload(photo: File) {
    const fd = new FormData();
    fd.append('photo', photo, photo.name);
    return this.http.post(`${this.uri}/photo_upload`, fd)
  }

  dohvatiSveKorisnike() {
    return this.http.get(`${this.uri}/dohvatiSveKorisnike`);
  }

  zahteviZaRegistraciju(){
    return this.http.get(`${this.uri}/zahteviZaRegistraciju`);
  }

  obrisiKorisnika(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/obrisiKorisnika`,data)
  }

  obrisiKorisnikaIzZahteva(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/obrisiKorisnikaIzZahteva`,data)
  }

  odbijKorisnika(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/odbijKorisnika`,data)
  }

  promenaLozinke(username, oldPassword, newPassword){
    const data = {
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword
    }
    return this.http.post(`${this.uri}/promenaLozinke`,data)
  }
}

