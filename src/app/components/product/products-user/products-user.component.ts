import { CartService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-user',
  templateUrl: './products-user.component.html',
  styleUrls: ['./products-user.component.css']
})
export class ProductsUserComponent implements OnInit {
 products: any;
constructor(public _ProductService: ProductService,private _CartService:CartService) {}
ngOnInit(): void {
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
  this._CartService.addToCart(productId,amount).subscribe({
    next:(value)=>{
      console.log(value);
    },
    error:(error)=>{
      console.log(error);
      
    }
  })
}
}
