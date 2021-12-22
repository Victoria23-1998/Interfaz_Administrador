import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  login(user:object){
    localStorage.setItem('Usuario',JSON.stringify(user))
  }
  isLoggedIn():boolean{
    const userLogged= localStorage.getItem('Usuario')
    if(userLogged === null || ''){
      return false
    }else{
      return true
    }

  
  }
}
