import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private _AuthService:AuthService,private _Router:Router){}

  apiError:any;
  registerForm:FormGroup = new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    address:new FormControl(null,[Validators.required]),
    password:new FormControl(null,[Validators.required]),
    confirmPassword:new FormControl(null,[Validators.required]),
   // rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{5,10}/)]),
  });

  handleRegister(registerForm:FormGroup){
    if(registerForm.valid){
      this._AuthService.register(registerForm.value).subscribe({
        next:(value)=>{
          console.log(value);
          
          this._Router.navigate(['/login']);
        },
        error:(error)=>{
          console.log(error.error);
          //console.log(error.error.errors);
          //console.log(error.error.errors.ConfirmPassword);
          
          this.apiError = error.error.errors;
        }
      })
    }

  }

}
