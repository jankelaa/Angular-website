import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretnina } from '../model/nekretnina.model';
import { User } from '../model/user.model';
import { NekretninaService } from '../services/nekretnina.service';

@Component({
  selector: 'app-nekretnine',
  templateUrl: './nekretnine.component.html',
  styleUrls: ['./nekretnine.component.css']
})
export class NekretnineComponent implements OnInit {

  constructor(private router: Router, private servisNekretnina: NekretninaService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.servisNekretnina.dohvatiPromovisaneNekretnine().subscribe((promovisane: Nekretnina[]) => {
      this.promovisane = promovisane;
    });
  }

  user: User;

  promovisane: Nekretnina[];
  promoIndex: number = 0;

  cenaOd: number = null
  cenaDo: number = null
  grad: string = ""

  nekretnine: Nekretnina[]
  nekretnineIndex: number = 0;

  message: string

  callNekretnina(nekretnina: Nekretnina){
    localStorage.setItem('nekretnina', JSON.stringify(nekretnina));
    localStorage.setItem('nekretninaValid', 'da');
    if (this.user.type=="user") this.router.navigate(['']);
  }

  rand(nekretnina: Nekretnina){
    return Math.floor(Math.random()*nekretnina.slike.length)
  }

  cenaOdChange(event) {
    if (this.cenaOd > this.cenaDo && this.cenaDo!=null)
      this.cenaDo = this.cenaOd;
  }
  cenaDoChange(event) {
    if(this.cenaOd!=null && this.cenaDo!=null && this.cenaOd > this.cenaDo) this.cenaDo=this.cenaOd
  }

  prevIndex() {
    this.promoIndex--;
    if (this.promoIndex < 0) this.promoIndex = 0;
  }

  nextIndex() {
    this.promoIndex++;
    if (this.promoIndex > this.promovisane.length - 1) this.promoIndex = this.promovisane.length - 1;
  }

  greaterThan(a, b) {
    return a > b;
  }

  lessThan(a, b) {
    return a < b;
  }

  gostPretraga() {
    this.message = ""
    if (this.cenaOd != null || this.cenaDo != null || this.grad != "") {
      this.servisNekretnina.gostPretraga(this.cenaOd, this.cenaDo, this.grad)
        .subscribe((nekretnine: Nekretnina[]) => {
          this.nekretnine = nekretnine;
        })
    } else {
      this.message = "Barem jedan kriterijum mora biti unet!\n";
      return
    }
  }

}
