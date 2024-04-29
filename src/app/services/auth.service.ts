import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData = new BehaviorSubject(null);
  //  headers = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Authorization': `Bearer ${localStorage.getItem('userToken')}`
  // });

  constructor(private _HttpClient:HttpClient, private _Router:Router) { 
    if(localStorage.getItem('userToken') !== null){
      this.decodeUserData();
    }
  }

  decodeUserData(){
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken :any = jwtDecode(encodedToken);
    // console.log(decodedToken);
    this.userData.next(decodedToken);
    
  }

  register(userData:object):Observable<any>{
    return this._HttpClient.post('https://localhost:44300/api/Accounts/Create',userData);
  }

  login(userData:object):Observable<any>{
    return this._HttpClient.post('https://localhost:44300/api/Accounts/Login',userData);
  }

  logOut(){
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/']);
  }
}
