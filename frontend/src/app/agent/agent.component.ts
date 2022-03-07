import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretnina } from '../model/nekretnina.model';
import { User } from '../model/user.model';
import { NekretninaService } from '../services/nekretnina.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

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

  nekretnine: Nekretnina[];

  oldPassword: string = "";
  password: string = "";
  password1: string = "";

  whatToDisplay: string = ""

  msg = ""

    
  zahteviZaProdaju(){
    this.whatToDisplay="zahteviZaProdaju"
  }
  
  promovisi(nekretnina: Nekretnina){
    this.nekretnineServis.promovisiNekretninu(nekretnina.grad,nekretnina.opstina,nekretnina.ulica,
      nekretnina.broj,nekretnina.stan,nekretnina.promo).subscribe((odg)=>{
        this.pregledNekretnina();
      })
  }

  pregledNekretnina(){
    this.nekretnineServis.pregledNekretnina().subscribe((nekretnine: Nekretnina[]) => {
      this.nekretnine = nekretnine;
      this.whatToDisplay="pregledNekretnina"
    })
  }

  dodajNekretninu() {
    this.whatToDisplay = "dodajNekretninu"
  }
  
  nekretnineGrafika() {
    this.whatToDisplay = "nekretnineGrafika"
  }

  zahteviZaNekretnine() {
    this.nekretnineServis.zahteviZaNekretnine().subscribe((nekretnine: Nekretnina[]) => {
      this.nekretnine = nekretnine;
      this.whatToDisplay = "zahteviZaNekretnine"
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

  prihvatiNekretninu(nekretnina: Nekretnina) {
    this.odbijNekretninu(nekretnina, false)
    this.nekretnineServis.dodajNekretninu(nekretnina.tip, nekretnina.opis, nekretnina.grad, nekretnina.opstina, nekretnina.ulica,
      nekretnina.broj, nekretnina.stan, nekretnina.sprat, nekretnina.spratnost, nekretnina.kvadratura, nekretnina.br_soba, nekretnina.namestenost,
      nekretnina.cena, nekretnina.vlasnik, nekretnina.promo, nekretnina.slike).subscribe(obj => {
        if (obj['nekretnina'] == 'ok') {
          alert("Nekretnina je prihvacena!")
          this.zahteviZaNekretnine();
        }else{
          this.msg=obj['msg']
        }
      })
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
