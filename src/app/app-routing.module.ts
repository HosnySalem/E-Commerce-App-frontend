import { authGuard } from './auth.guard';
import { SignupComponent } from './components/user/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { ProductsComponent } from './components/product/products/products.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { ProductsUserComponent } from './components/product/products-user/products-user.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  // { path: 'home', component: HomeComponent },
 // { path: '', component: HomeComponent },
 // { path: '', redirectTo:'userProducts',pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'userProducts', component: ProductsUserComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'products/:id/edit', component: ProductFormComponent },
  { path: 'cart', component: CartComponent },
];
//canActivate:[authGuard],

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
