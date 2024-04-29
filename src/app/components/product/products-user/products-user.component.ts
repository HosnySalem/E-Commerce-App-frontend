import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-user',
  templateUrl: './products-user.component.html',
  styleUrls: ['./products-user.component.css']
})
export class ProductsUserComponent implements OnInit {
 products: any;
 isLogin:any;
constructor(public _ProductService: ProductService,private _CartService:CartService,private _AuthService:AuthService,private _Router:Router) {}
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
  this._ProductService.getAllProducts().subscribe({
    next: (data) => {
      console.log(data);
      this.products = data;
    },
    error: (error) => {
      console.log(error);
    },
  });
}

addToCart(productId:number,amount:number){
  if(this.isLogin){
    this._CartService.addToCart(productId,amount).subscribe({
      next:(value)=>{
        console.log(value);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }else{
    this._Router.navigate(['/login']);
  }
}
}
