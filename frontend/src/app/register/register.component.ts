import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: UserService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'))
    if (this.user != null) {
      if (this.user.type == 'user')
        this.router.navigate(['user']);
      else if (this.user.type == 'agent')
        this.router.navigate(['agent']);
      else if (this.user.type == 'admin')
        this.router.navigate(['admin']);
    }
  }

  user: User;

  firstname: string = "";
  lastname: string = "";
  username: string = "";
  password: string = "";
  password1: string = "";
  email: string = "";
  city: string = "";
  country: string = "";
  types: string[] = ["Korisnik", "Agent"]
  type: string = this.types[0];
  photo: File = null;
  photoName: string = "";

  message: string;


  onPhotoSelected(event) {
    this.photo = event.target.files[0];
    this.photoName = this.photo.name;
  }

  register() {
    this.message = ""
    if (this.firstname == "" || this.lastname == "" || this.username == "" || this.password == "" || this.password1 == ""
      || this.email == "" || this.city == "" || this.country == "") {
      this.message = "Sva polja moraju biti poponjena!\n";
      return
    }
    if (this.password != this.password1) {
      this.message = "Lozinka i potvrdjena lozinka moraju biti iste!\n"
      return
    }
    let emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+\.[a-zA-Z-0-9-.]+$/
    if (!emailPattern.test(this.email)) {
      this.message = "E-mail nije u dobrom formatu!\n"
      return
    }
    let passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/
    if (!passPattern.test(this.password)) {
      this.message = "Lozinka nije u dobrom formatu\n"
      return
    }

    if (this.message == "" && this.user == null) {
      this.service.register_request(this.firstname, this.lastname, this.username, this.password, this.email,
        this.city, this.country, this.photoName).subscribe(obj => {
          if (obj['user'] == 'ok') {
            if (this.photo != null) {
              this.service.photo_upload(this.photo).subscribe(odg => {
              })
            }
            alert('Uspesno poslat zahtev za registraciju!\nSacekajte dok vas administrator odobri!')
            this.router.navigate(['']);
          } else {
            this.message = obj['msg'];
          }
        })
    } else {
      if (this.type == 'Agent') this.type = "agent"
      else this.type = "user"
      this.service.dodajKorisnika(this.firstname, this.lastname, this.username, this.password, this.email,
        this.city, this.country, this.type, this.photoName).subscribe(obj => {
          if (obj['user'] == 'ok') {
            if (this.photo != null) {
              this.service.photo_upload(this.photo).subscribe(odg => {
              })
            }
            alert('Uspesna registracija korisnika!')
          } else {
            this.message = obj['msg'];
          }
        })
    }
  }
}
