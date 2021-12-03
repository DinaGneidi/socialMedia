import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/providers/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg=""

  invalidData: Boolean = false
  isSubmitted : Boolean = false
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  get email(){return this.loginForm.get('email')}
  get password(){return this.loginForm.get('password')}

  constructor(private _auth:UserService, private _route:Router) { }

  ngOnInit(): void {
  }

  handleLogin(){
    this.isSubmitted = true
    if(this.loginForm.valid){
      this._auth.userLogin(this.loginForm.value).subscribe(
        (res) => {
          localStorage.setItem("userToken", res.data.token)
          console.log(res.data)
        },
        (e) => {
          console.log(e)
          this.invalidData = true
        },
        () => {
          this.loginForm.reset()
          this.isSubmitted = false
          console.log("Done")
          this.msg=""
          this._route.navigateByUrl('/profile')
        }
      )
    }else{
      this.msg="Invalid email or password"
    }
  }

}
