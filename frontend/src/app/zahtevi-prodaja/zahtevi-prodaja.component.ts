import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretnina } from '../model/nekretnina.model';
import { Purchase_request } from '../model/purchase_request.model';
import { User } from '../model/user.model';
import { NekretninaService } from '../services/nekretnina.service';

@Component({
  selector: 'app-zahtevi-prodaja',
  templateUrl: './zahtevi-prodaja.component.html',
  styleUrls: ['./zahtevi-prodaja.component.css']
})
export class ZahteviProdajaComponent implements OnInit {

  constructor(private router: Router, private servisNekretnina: NekretninaService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    if (this.user.type == 'user')
      this.servisNekretnina.dohvatiPonude(this.user.username, false).subscribe((nekretnine: Purchase_request[]) => {
        this.nekretnine = nekretnine;
      });
    else if (this.user.type == 'agent' || this.user.type == 'admin')
      this.servisNekretnina.dohvatiPonude('agencija', true).subscribe((nekretnine: Purchase_request[]) => {
        this.nekretnine = nekretnine;
      });
  }

  user: User
  nekretnine: Purchase_request[]

  odbijPonuduUser(nekretnina: Purchase_request) {
    this.servisNekretnina.odbijPonuduUser(nekretnina.kupac, nekretnina.vlasnik, nekretnina.grad, nekretnina.opstina,
      nekretnina.ulica, nekretnina.broj, nekretnina.stan).subscribe((res) => {
        alert("Ponuda korisnika " + nekretnina.kupac + " je odbijena!")
        location.reload()
      })
  }

  prihvatiPonuduUser(nekretnina: Purchase_request) {
    this.servisNekretnina.prihvatiPonuduUser(nekretnina.kupac, nekretnina.vlasnik, nekretnina.grad, nekretnina.opstina,
      nekretnina.ulica, nekretnina.broj, nekretnina.stan).subscribe(obj => {
        if (obj['ponuda'] == 'ok') {
          alert("Ponuda korisnika " + nekretnina.kupac + " je prihvacena!")
          location.reload()
        }
      })
  }

  odbijPonuduAgent(nekretnina: Purchase_request, statement: boolean) {
    this.servisNekretnina.odbijPonuduAgent(nekretnina.kupac, nekretnina.vlasnik, nekretnina.grad, nekretnina.opstina,
      nekretnina.ulica, nekretnina.broj, nekretnina.stan).subscribe((res) => {
        if (statement) {
          alert("Ponuda korisnika " + nekretnina.kupac + " je odbijena!")
          location.reload();
        }
      })
  }

  prihvatiPonuduAgent(nekretnina: Purchase_request) {
    this.odbijPonuduAgent(nekretnina, false)
    this.servisNekretnina.prihvatiPonuduAgent(nekretnina.kupac, nekretnina.vlasnik, nekretnina.cena, nekretnina.tip,
      nekretnina.grad, nekretnina.opstina, nekretnina.ulica, nekretnina.broj, nekretnina.stan).subscribe(obj => {
        if (obj['kupovina'] == 'ok') {
          alert("Ponuda korisnika " + nekretnina.kupac + " je prihvacena!")
          location.reload();
        }else{
          let message = obj['msg']
          alert(message)
          location.reload();
        }
      })
  }

  potvrdiProdaju(nekretnina: Purchase_request) {
    this.prihvatiPonuduAgent(nekretnina)
  }
}
