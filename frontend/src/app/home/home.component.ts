import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nekretnina } from '../model/nekretnina.model';
import { User } from '../model/user.model';
import { NekretninaService } from '../services/nekretnina.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private servisNekretnina: NekretninaService) { }

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

}
