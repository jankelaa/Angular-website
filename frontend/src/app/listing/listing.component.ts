import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { NekretninaService } from '../services/nekretnina.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  constructor(private userService: UserService, private nekretnineService: NekretninaService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  user: User;

  tip: string = "kuca";
  opis: string = "";
  grad: string = "";
  opstina: string = "";
  ulica: string = "";
  broj: number = null;
  stan: number = null; //broj stana
  sprat: number = null; // sprat u zgradi, za stan
  spratnost: number = null;
  kvadratura: number = null;
  br_soba: number = null;
  namestenost: boolean = false;
  cena: number = null;
  vlasnik: string;
  promo: boolean = false;

  slike: File[] = null;
  slikeNaziv: string[] = null;

  message: string;


  uploadMultiplePhotos(event) {
    this.slike = event.target.files;
    let nazivi = new Array();
    for (let i = 0; i < this.slike.length; i++)
      nazivi.push(this.slike[i].name)
    this.slikeNaziv = nazivi;
  }

  dodajNekretninu() {
    this.message = ""
    if (this.opis == "" || this.grad == "" || this.opstina == "" || this.ulica == "" || this.broj == null
      || this.spratnost == null || this.kvadratura == null || this.br_soba == null || this.cena == null
      || (this.tip == "stan" && (this.stan == null || this.sprat == null))) {
      this.message = "Sva polja moraju biti poponjena!\n";
      return
    }
    if (this.slike == null) {
      this.message = "Morate uneti barem 3 slike ili videa\n"
      return
    }
    if (this.slike.length < 3) {
      this.message = "Morate uneti barem 3 slike ili videa\n"
      return
    }

    if (this.tip == "kuca") {
      this.stan = null;
      this.sprat = null
    }

    if (this.message == "" && this.user.type == 'user') {
      this.vlasnik = this.user.username;
      this.nekretnineService.listing_request(this.tip, this.opis, this.grad, this.opstina, this.ulica,
        this.broj, this.stan, this.sprat, this.spratnost, this.kvadratura, this.br_soba, this.namestenost,
        this.cena, this.vlasnik, this.promo, this.slikeNaziv).subscribe(obj => {
          if (obj['nekretnina'] == 'ok') {
            this.nekretnineService.photos_upload(this.slike).subscribe(odg => {
              if (odg['slike'] == 'ok')
                alert('Uspesno poslat zahtev za postavljanje nekretnine!\nSacekajte da je administrator odobri!')
              else
                alert('Nisu okacene slike!')
            })
          } else {
            this.message = obj['msg'];
          }
        })
    } else {
      if (this.user.type == 'agent' || this.user.type == 'admin') this.vlasnik = "agencija"
      this.nekretnineService.dodajNekretninu(this.tip, this.opis, this.grad, this.opstina, this.ulica,
        this.broj, this.stan, this.sprat, this.spratnost, this.kvadratura, this.br_soba, this.namestenost,
        this.cena, this.vlasnik, this.promo, this.slikeNaziv).subscribe(obj => {
          if (obj['nekretnina'] == 'ok') {
            this.nekretnineService.photos_upload(this.slike).subscribe(odg => {
              if (odg['slike'] == 'ok')
                alert('Uspesna registracija nekretnine!')
              else
                alert('Nisu okacene slike!')
            })
          } else {
            this.message = obj['msg'];
          }
        })
    }
  }
}
