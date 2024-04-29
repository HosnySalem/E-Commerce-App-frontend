import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  basurl: string = 'https://localhost:44300/api/Cart';
  headers = new HttpHeaders({
    'Authorization':`Bearer ${localStorage.getItem('userToken')}`
  });

  constructor(public http:HttpClient) {}
//https://localhost:44300/api/Cart?productid=2&quantity=5
//https://localhost:44300/api/Cart?productid=2&quantity=5
  addToCart(productId:number,amount:number) {
   // return this.http.post(`https://localhost:44300/api/Cart`,{productId,count},{headers:this.headers});
    return this.http.post(`${this.basurl}?productid=${productId}&quantity=${amount}`,{},{headers:this.headers});
  }

  getLoggedUserCart() {
    return this.http.get(this.basurl,{headers:this.headers});
  }
  deleteCartItem(productId:string) {
    return this.http.delete(`${this.basurl}/remove/${productId}`,{headers:this.headers});
  }
  deleteAllCartItems() {
    return this.http.delete(`${this.basurl}/remove-all`,{headers:this.headers});
  }

  updateItemCount(productId:string,count:number) {
    return this.http.put(`${this.basurl}/update?productid=${productId}&quantity=${count}`,{},{headers:this.headers});
  }

}
