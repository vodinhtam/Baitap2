import { Injectable } from '@angular/core';
import { Account } from './account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accounts: Account[] = [
    new Account('demo', 'demo'),
    new Account('username', 'password')
  ]

  constructor(){}

  getAccount(username: string){
    return this.accounts.find(x => x.username === username)
  }

  getLoginAccount(){
    return this.getAccount(localStorage.getItem('loginAccount'))
  }

  addAccount(acc: Account){
    this.accounts.push(acc)
  }

  checkAndPerformLogin(username: string, password: string){
    let logAcc = this.accounts.find(x => x.username === username && x.password === password)

    if(!logAcc){
      return false;
    } else {
      localStorage.setItem('loginAccount',username)
      return true;
    }
  }

  logOut(){
    localStorage.removeItem('loginAccount')
  }

}
