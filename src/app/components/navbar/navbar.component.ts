import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogin:boolean = false;
  logOut(){
    this._AuthService.logOut();
  }
  constructor(private _AuthService:AuthService){}
  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next:()=> {
      if(this._AuthService.userData.getValue() !== null){
        this.isLogin = true;
      }
      else{
        this.isLogin = false;
      }
      },

    })

    }

}
