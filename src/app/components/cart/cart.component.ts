import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{


  cartDetails:any;

  constructor(private _cartService:CartService){}

  ngOnInit(): void {
    this._cartService.getLoggedUserCart().subscribe({
      next:(value)=>{
        this.cartDetails = value;
        console.log(value);
      },
      error:(error)=>{console.log(error);}
    })
  }
  removeItem(productId:any){
    this._cartService.deleteCartItem(productId).subscribe({
      next:(value)=>{
        this.cartDetails = value;
        console.log(value);
      },
      error:(error)=>{console.log(error);}
    })
  }

  emptyCart(){
    this._cartService.deleteAllCartItems().subscribe({
      next:(value)=>{
        console.log(value);
        this.cartDetails = value;
      },
      error:(error)=>console.log(error)
      
    })
  }
  updateCart(productId:any,count:any){
    this._cartService.updateItemCount(productId,count).subscribe({
      next:(value)=>{
        this.cartDetails = value;
        console.log(value);
      },
      error:(error)=>console.log(error)
      
    })
  }



}
