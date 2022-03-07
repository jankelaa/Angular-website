import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;

  message: string;

  login(){
    this.userService.login(this.username, this.password).subscribe((user:User)=>{
      if(user){
        this.message="";
        //localStorage.setItem('user',user.username);
        localStorage.setItem('user', JSON.stringify(user));
        if (user.type=="user") this.router.navigate(['user']);
        else if (user.type=="agent") this.router.navigate(['agent']);
        else if (user.type=="admin") this.router.navigate(['admin']);
        else alert("Error");
      }else{
        this.message="Pogresno ste uneli korisnicko ime ili lozinku!"
      }
    })
  }

  
}
