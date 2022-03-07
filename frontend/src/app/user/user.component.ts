import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretnina } from '../model/nekretnina.model';
import { User } from '../model/user.model';
import { NekretninaService } from '../services/nekretnina.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private nekretnineServis: NekretninaService) { }

  ngOnInit(): void {
    let nekretninaValid = localStorage.getItem('nekretninaValid')
    if (nekretninaValid != "da")
      localStorage.removeItem('nekretnina')

    this.nekretnina = JSON.parse(localStorage.getItem('nekretnina'))
    localStorage.removeItem('nekretninaValid')

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

  oldPassword: string = "";
  password: string = "";
  password1: string = "";

  nekretnine: Nekretnina[];
  nekretnina: Nekretnina;

  nacinPlacanja: string = "kes"

  whatToDisplay: string = ""

  msg = ""


  isMP4(slika:string){
    return slika.endsWith(".mp4")
  }

  callNekretnina(nekretnina: Nekretnina){
    localStorage.setItem('nekretnina', JSON.stringify(nekretnina));
    localStorage.setItem('nekretninaValid', 'da');
    if (this.user.type=="user") this.router.navigate(['']);
  }

  izmeniNekretninu(nekretnina:Nekretnina) {
    localStorage.setItem('nekretnina', JSON.stringify(nekretnina));
    localStorage.setItem('nekretninaValid', 'da');
    this.whatToDisplay = 'izmenaNekretnine'
  }

  profil() {
    this.whatToDisplay = 'profil'
  }

  prikaziZahteveZaKupovinu() {
    this.nekretnina = null
    this.whatToDisplay = "zahteviZaKupovinu"
  }

  dajPonudu(nekretnina: Nekretnina) {
    this.nekretnineServis.dajPonudu(nekretnina.cena, nekretnina.tip, nekretnina.grad, nekretnina.opstina, nekretnina.ulica, nekretnina.broj,
      nekretnina.stan, nekretnina.vlasnik, this.user.username).subscribe((odg) => {
        if (odg['ponuda'] == 'ok') {
          if (this.nacinPlacanja == "kes")
            alert('Podneli ste zahtev za kupovinu ove nekretnine!')
          if (this.nacinPlacanja == "kredit") {
            let ucesce = nekretnina.cena * 0.2
            alert('Podneli ste zahtev za kupovinu ove nekretnine!\nUcesce za placanje kreditom je ' + ucesce)
          }
        }
        else if (odg['ponuda'] == 'no') {
          let message = odg['msg']
          alert(message)
        }
      })
  }

  obrisiNekretninu(nekretnina: Nekretnina) {
    this.nekretnineServis.obrisiNekretninu(nekretnina.ulica, nekretnina.broj, nekretnina.grad, nekretnina.opstina,
      nekretnina.stan).subscribe((res) => {
        alert("Nekretnina je uklonjena iz sistema!")
        this.mojeNekretnine();
      })
  }

  dodajNekretninu() {
    this.nekretnina = null
    this.whatToDisplay = "dodajNekretninu"
  }

  prikaziNekretnine() {
    this.msg = ""
    this.nekretnina = null
    this.whatToDisplay = "sveNekretnine"
  }

  mojeNekretnine() {
    this.nekretnina = null
    this.nekretnineServis.mojeNekretnine(this.user.username)
      .subscribe((nekretnine: Nekretnina[]) => {
        this.nekretnine = nekretnine;
      })
    if (this.nekretnine == null)
      this.msg = "Nemate nijednu prijavljenu nekretninu...\n"

    this.whatToDisplay = "mojeNekretnine"
  }

  lozinka() {
    this.nekretnina = null
    this.msg = ""
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
