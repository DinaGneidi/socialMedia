import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/providers/services/user.service';
//import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoaded = false
  //isAuthed= false
  //myAuth = environment.isAuthed
  constructor(public  _auth: UserService) { }

  ngOnInit(): void {
    this._auth.userProfile().subscribe(
    (data)=>{
      console.log(data)
      this._auth.userData = data
    },
    ()=>{
      this.isLoaded=true
      this._auth.isAuthed= false
    },
    ()=>{
      this.isLoaded= true
      this._auth.isAuthed=true
    }
    )
  }

}
