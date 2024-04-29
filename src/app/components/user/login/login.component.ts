import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService,private _Router:Router){}

  apiError:string = '';

  loginForm:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required])
   // password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}/)])
  });

  handleLogin(loginForm:FormGroup){
    if(loginForm.valid){
      this._AuthService.login(loginForm.value).subscribe({
        next:(value)=>{
          console.log(value);
          console.log(loginForm);
          
          localStorage.setItem('userToken',value.token);
          this._AuthService.decodeUserData();
          this._Router.navigate(['/userProducts']);
        },
        error:(error)=>{
          console.log(error);
          
          this.apiError = error.error.errors.msg;
        }
      })
    }

  }
}
