import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/providers/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isLoaded = false
  constructor(public _auth:UserService) { }

  ngOnInit(): void {
    this._auth.userProfile().subscribe(
      (userData)=>{console.log(userData)},
      (e)=>{console.log(e)},
      ()=>{
        console.log("Done")
      this.isLoaded=true
      }
      )
  }
}
