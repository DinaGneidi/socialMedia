import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { UserService } from 'src/app/providers/services/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  isLoaded = false
    editForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    birthDate: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required])
  })
  passwordForm = new FormGroup({
    password:new FormControl('',[Validators.required]),
    passwordNew:new FormControl('',[Validators.required]),
    passwordConfirm :new FormControl('',[Validators.required])
  })

  constructor( public _auth: UserService) { }

  ngOnInit(): void {

    this.editForm.patchValue(this._auth.userData)

  }
  handleEdit(){
    this._auth.editProfile(this.editForm.value).subscribe(
      (userData)=>{
        console.log(userData)
      },
      (e)=>{
        console.log(e)
      },
      ()=>{
        console.log("Done")
        this.isLoaded=true
      }
    )
  }

  handlePassword(){
    if(this.passwordForm.value.passwordNew==this.passwordForm.value.passwordConfirm){
      this._auth.editPassword(this.passwordForm.value.passwordNew,this.passwordForm.value.password).subscribe(
        (userData)=>{
          console.log(userData);
        },
        (e)=>{
          console.log(e)
        },
        ()=>{
          this.passwordForm.reset()
          console.log('done')
        }
      )

  }
  }
}
