import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    if (this.user.type == "user") this.profil = this.user;
    else if (this.user.type == "admin") this.profil = JSON.parse(localStorage.getItem('profil'))
    this.type = this.profil.type
    this.photoName = this.profil.photo
  }

  user: User
  profil: User

  firstname: string
  lastname: string
  email: string = ""
  city: string
  country: string
  type: string
  emailValidate: boolean = false

  photo: File = null;
  photoName: string;

  message: string;

  onPhotoSelected(event) {
    this.photo = event.target.files[0];
    this.photoName = this.photo.name;
  }

  azurirajProfil() {
    this.message = ""
    this.emailValidate = false

    if ((this.email != "") && (this.email != this.profil.email)) {
      let emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+\.[a-zA-Z-0-9-.]+$/
      if (!emailPattern.test(this.email)) {
        this.message = "E-mail nije u dobrom formatu!\n"
      }/*
      if (this.message == "") {
        this.userService.checkEmail(this.email).subscribe(email => {
          if (email['email'] != 'ok') {
            this.message = "E-mail mora biti jedinstven!\n"
          }
        })
      }*/else {
        this.emailValidate = true
      }
    } else {
      this.email = this.profil.email
    }

    if (this.message == "") {
      if (this.firstname == "" || this.firstname == null) this.firstname = this.profil.firstname
      if (this.lastname == "" || this.lastname == null) this.lastname = this.profil.lastname
      if (this.city == "" || this.city == null) this.city = this.profil.city
      if (this.country == "" || this.country == null) this.country = this.profil.country


      if (this.user.type == "user") {
        this.type = "user";
        this.userService.azurirajProfil(this.profil.username, this.firstname, this.lastname, this.email,
          this.city, this.country, this.type, this.photoName, this.emailValidate).subscribe(obj => {
            if (obj['user'] == 'ok') {
              if (this.photo != null) {
                this.userService.photo_upload(this.photo).subscribe(odg => {
                  alert('Profil je azuriran!\nPodaci će biti vidljivi pri sledećem logovanju!')
                })
              } else {
                alert('Profil je azuriran!\nPodaci će biti vidljivi pri sledećem logovanju!')
                location.reload()
              }
            } else {
              if (obj['email'] == 'no')
                this.message = 'Email mora biti jedinstven!'
            }
          })
      } else {
        this.userService.azurirajProfil(this.profil.username, this.firstname, this.lastname, this.email,
          this.city, this.country, this.type, this.photoName, this.emailValidate).subscribe(obj => {
            if (obj['user'] == 'ok') {
              if (this.photo != null) {
                this.userService.photo_upload(this.photo).subscribe(odg => {
                })
              }
              alert('Profil je azuriran!')
              location.reload()
            } else {
              if (obj['email'] == 'no')
                this.message = 'Email mora biti jedinstven!'
            }
          })
      }
    }
  }
}
