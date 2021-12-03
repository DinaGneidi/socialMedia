import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

public isAuthed = false
public userData:any = null
  commonURL = "http://localhost:3000/api/user/"

  constructor(private _http:HttpClient) { }

  registerUser(userData: User):Observable<any>{
    return this._http.post(`${this.commonURL}register`, userData)
  }

  userLogin(userData:any):Observable<any>{
    return this._http.post(`${this.commonURL}login`, userData)
  }

  userProfile():Observable<any>{
    return this._http.get(`${this.commonURL}profile`)
  }

  editProfile(userData: any){
    //return this._http.patch(`${this.commonUrl}uploadProfilePic`, userData)
  }

}
