
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';



export const authGuard: CanActivateFn = (route, state) => {

  if(localStorage.getItem('userToken')!==null){
    return true;
  }
  else{
  
    //this.router.navigate(['/login']);
    return inject(Router).createUrlTree(['/login']);
   // return true;
  }
};

