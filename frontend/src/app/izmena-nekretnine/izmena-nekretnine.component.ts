import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretnina } from '../model/nekretnina.model';
import { NekretninaService } from '../services/nekretnina.service';

@Component({
  selector: 'app-izmena-nekretnine',
  templateUrl: './izmena-nekretnine.component.html',
  styleUrls: ['./izmena-nekretnine.component.css']
})
export class IzmenaNekretnineComponent implements OnInit {

  constructor(private router: Router, private nekretnineService: NekretninaService) { }

  ngOnInit(): void {
    this.nekretnina = JSON.parse(localStorage.getItem('nekretnina'))
    this.opis=this.nekretnina.opis
    this.namestenost = this.nekretnina.namestenost
    for (let i = 0; i < this.nekretnina.slike.length; i++)
      this.slikeNaziv.push(this.nekretnina.slike[i] as string)
  }

  nekretnina: Nekretnina


  opis: string
  grad: string
  opstina: string
  ulica: string
  broj: number
  stan: number  //broj stana
  sprat: number // sprat u zgradi, za stan
  spratnost: number 
  kvadratura: number 
  br_soba: number 
  namestenost: boolean 
  cena: number 

  slike: File[] = null;
  slikeNaziv: string[] = null;

  message: string;

  uploadMultiplePhotos(event) {
    this.slike = event.target.files;
    let nazivi = new Array();
    for (let i = 0; i < this.slike.length; i++)
      this.slikeNaziv.push(this.slike[i].name)
  }

  azurirajNekretninu() {
    if (this.opis == "" || this.opis == null) this.opis = this.nekretnina.opis
    if (this.grad == "" || this.grad == null) this.grad = this.nekretnina.grad
    if (this.opstina == "" || this.opstina == null) this.opstina = this.nekretnina.opstina
    if (this.ulica == "" || this.ulica == null) this.ulica = this.nekretnina.ulica
    if (this.broj == null) this.broj = this.nekretnina.broj
    if (this.stan == null) this.stan = this.nekretnina.stan
    if (this.sprat == null) this.sprat = this.nekretnina.sprat
    if (this.spratnost == null) this.spratnost = this.nekretnina.spratnost
    if (this.kvadratura == null) this.kvadratura = this.nekretnina.kvadratura
    if (this.namestenost == null) this.namestenost = this.nekretnina.namestenost
    if (this.cena == null) this.cena = this.nekretnina.cena

    this.nekretnineService.azurirajNekretninu(this.nekretnina.grad, this.nekretnina.opstina, this.nekretnina.ulica,
      this.nekretnina.broj, this.nekretnina.stan, this.opis, this.grad, this.opstina, this.ulica,
      this.broj, this.stan, this.sprat, this.spratnost, this.kvadratura, this.br_soba, this.namestenost,
      this.cena, this.slikeNaziv).subscribe(obj => {
        if (obj['nekretnina'] == 'ok') {
          if (this.slike.length > 0) {
            this.nekretnineService.photos_upload(this.slike).subscribe(odg => {
              if (odg['slike'] == 'ok')
                alert('Uspesna azurirana nekretnina!')
            })
          }else{
            alert('Uspesna azurirana nekretnine!')
          }
        } else {
          this.message = obj['msg'];
        }
      })
  }

}
