import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  user: User;

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }
}
