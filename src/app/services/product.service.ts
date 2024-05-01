import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  //basurl: string = 'http://localhost:44300/products';
  basurl: string = 'https://localhost:7226/api/Products';
  headers = new HttpHeaders({
    Authorization:`Bearer ${localStorage.getItem('userToken')}`
  });

  constructor(public http:HttpClient) {}
  getAllProducts() {
    return this.http.get(this.basurl,{headers:this.headers});
  }
  getProductById(id: number) {
    return this.http.get(this.basurl + '/' + id,{headers:this.headers});
  }
  deleteProduct(id: number) {
    return this.http.delete(this.basurl + '/' + id,{headers:this.headers});
  }
  addProduct(product: any) {
    return this.http.post(this.basurl ,product,{headers:this.headers});
  }
  // saveProduct(formData: FormData) {
  //   return this.http.post(this.basurl, formData,{headers:this.headers});
  // }
  saveProduct(formData: FormData) {
    return this.http.post(this.basurl, formData,{headers:this.headers});
  }
  EditProduct(id: any,formData: FormData) {
    return this.http.post(`${this.basurl}/${id}`, formData,{headers:this.headers});
  }
  // updateProduct(product: any) {
  //   return this.http.put(this.basurl, product);
  // }
  updateProduct(id: any, product: any) {
    return this.http.put(`${this.basurl}/${id}`, product,{headers:this.headers});
  }
  getAllCategories() {
    return this.http.get('https://localhost:7226/api/Categories',{headers:this.headers});
  }
}
