import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretnina } from '../model/nekretnina.model';
import { Purchase } from '../model/purchase.model';
import { User } from '../model/user.model';
import { NekretninaService } from '../services/nekretnina.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private nekretnineServis: NekretninaService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    if (this.user == null)
      this.router.navigate(['']);
    else if (this.user.type == 'user')
      this.router.navigate(['user']);
    else if (this.user.type == 'agent')
      this.router.navigate(['agent']);
    else if (this.user.type == 'admin')
      this.router.navigate(['admin']);
  }

  user: User;

  korisnici: User[]
  nekretnine: Nekretnina[];
  prodaje: Purchase[]

  oldPassword: string = "";
  password: string = "";
  password1: string = "";

  whatToDisplay: string = ""

  msg = ""

  profil(profil: User) {
    localStorage.setItem('profil', JSON.stringify(profil));
    this.whatToDisplay = 'profil'
  }

  dohvatiKorisnike() {
    this.userService.dohvatiSveKorisnike().subscribe((korisnici: User[]) => {
      this.korisnici = korisnici;
      this.whatToDisplay = "korisnici"
    })
  }  

  pregledProdaja(){
    this.nekretnineServis.pregledProdaja().subscribe((prodaje: Purchase[]) => {
      this.prodaje = prodaje;
      console.log(this.prodaje)
      this.whatToDisplay="pregledProdaja"
    })
  }

  zahteviZaRegistraciju() {
    this.userService.zahteviZaRegistraciju().subscribe((korisnici: User[]) => {
      this.korisnici = korisnici;
      this.whatToDisplay = "zahteviZaRegistraciju"
    })
  }

  obrisiKorisnika(username) {
    this.userService.obrisiKorisnika(username).subscribe((res) => {
      alert("Korisnik " + username + " je uklonjen iz sistema!")
      this.dohvatiKorisnike();
    })
  }

  odbijKorisnika(username, statement) {
    this.userService.odbijKorisnika(username).subscribe((res) => {
      if (statement) {
        alert("Korisnik " + username + " je odbijen!")
        this.zahteviZaRegistraciju();
      }
    })
  }

  prihvatiKorisnika(korisnik) {
    this.odbijKorisnika(korisnik.username, false)
    this.userService.dodajKorisnika(korisnik.firstname, korisnik.lastname, korisnik.username, korisnik.password, korisnik.email,
      korisnik.city, korisnik.country, korisnik.type, korisnik.photo).subscribe(obj => {
        if (obj['user'] == 'ok') {
          alert("Korisnik " + korisnik.username + " je prihvacen!")
          this.zahteviZaRegistraciju();
        }
      })
  }

  prihvatiNekretninu(nekretnina: Nekretnina) {
    this.odbijNekretninu(nekretnina, false)
    this.nekretnineServis.dodajNekretninu(nekretnina.tip, nekretnina.opis, nekretnina.grad, nekretnina.opstina, nekretnina.ulica,
      nekretnina.broj, nekretnina.stan, nekretnina.sprat, nekretnina.spratnost, nekretnina.kvadratura, nekretnina.br_soba, nekretnina.namestenost,
      nekretnina.cena, nekretnina.vlasnik, nekretnina.promo, nekretnina.slike).subscribe(obj => {
        if (obj['nekretnina'] == 'ok') {
          alert("Nekretnina je prihvacena!")
          this.zahteviZaNekretnine();
        } else {
          this.msg = obj['msg']
        }
      })
  }

  odbijNekretninu(nekretnina: Nekretnina, statement) {
    this.nekretnineServis.odbijNekretninu(nekretnina.ulica, nekretnina.broj, nekretnina.stan, nekretnina.grad, nekretnina.opstina)
      .subscribe((res) => {
        if (statement) {
          alert("Nekretnina je odbijena!")
          this.zahteviZaNekretnine();
        }
      })
  }

  zahteviZaNekretnine() {
    this.nekretnineServis.zahteviZaNekretnine().subscribe((nekretnine: Nekretnina[]) => {
      this.nekretnine = nekretnine;
      this.whatToDisplay = "zahteviZaNekretnine"
    })
  }


  dodajKorisnika() {
    this.whatToDisplay = "dodajKorisnika"
  }

  nekretnineLista() {
    this.whatToDisplay = "nekretnine"
  }

  dodajNekretninu() {
    this.whatToDisplay = "dodajNekretninu"
  }

  nekretnineGrafika() {
    this.whatToDisplay = "nekretnineGrafika"
  }

  lozinka() {
    this.whatToDisplay = "promenaLozinke"
  }

  promenaLozinke() {
    this.msg = ""

    if (this.password == "" || this.password1 == "" || this.oldPassword == "") {
      this.msg = "Sva polja moraju biti uneta!\n"
      return
    }

    if (this.password != this.password1) {
      this.msg = "Lozinka i potvrdjena lozinka moraju biti iste!\n"
      return
    }
    let passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/
    if (!passPattern.test(this.password)) {
      this.msg = "Lozinka nije u dobrom formatu\n"
      return
    }
    this.userService.promenaLozinke(this.user.username, this.oldPassword, this.password).subscribe(obj => {
      if (obj['user'] == 'ok') {
        alert('Uspesno ste promenili lozinku!')
        localStorage.removeItem('user');
        this.router.navigate(['']);
      } else {
        this.msg = obj['msg'];
        return
      }
    })
  }
}
