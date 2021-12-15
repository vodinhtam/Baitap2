import { Injectable } from '@angular/core';
import { Account } from '../model/account.model';
import { Router } from '@angular/router';
import { BehaviorSubject,  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accounts: Account[] = [
    new Account('demo', 'demo', false),
    new Account('username', 'password', true)
  ]
  loginUser$ = new BehaviorSubject<Account>(undefined)

  constructor(private router: Router){}

  getAccount(username: string){
    return this.accounts.find(x => x.username === username);
  }

  addAccount(acc: Account){
    this.accounts.push(acc);
  }

  checkAndPerformLogin(username: string, password: string){
    let logAcc = this.accounts.find(x => x.username === username && x.password === password);

    if(!logAcc){
      return false;
    } else {
      
      this.loginUser$.next(logAcc);
      this.router.navigate(['home']);
      return true;
    }
  }

  logOut(){
    this.loginUser$.next(undefined);
  }

}
