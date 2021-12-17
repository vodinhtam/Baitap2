import { Injectable } from '@angular/core';
import { Account } from '../model/account.model';
import { BehaviorSubject,  } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accounts: Account[] = [
    new Account('demo', 'demo', false),
    new Account('demo1', 'demo', false),
    new Account('username', 'password', true)
  ]

  accounts$ = new BehaviorSubject<Account[]>(this.accounts)
  loginUser$ = new BehaviorSubject<Account>(new Account('demo1', 'demo', false))

  constructor(private cartService: CartService){}

  getAccounts(){
    return [...this.accounts$.getValue()];
  }

  getAccount(username: string){
    return this.getAccounts().find(x => x.username === username);
  }

  addAccount(username: string, password: string, isAdmin: boolean){
    const newAcc = new Account(username, password, isAdmin);
    const accounts = this.getAccounts();
    
    accounts.push(newAcc);
    this.accounts$.next(accounts);
    
    //Khi add new account, tạo thêm 1 cart tương ứng
    this.cartService.createNewCart(username);
  }

  checkAndPerformLogin(username: string, password: string){
    const logAcc = this.getAccounts().find(x => x.username === username && x.password === password);

    if(!logAcc){
      return false;
    } else {
      this.loginUser$.next(logAcc);
      return true;
    }
  }

  checkAndCreateNewAccount(username: string, password: string){
    if (this.getAccount(username)) {
      return false;
    } else {
      this.addAccount(username.toLowerCase(), password, false);
      return true;
    }
  }

  logOut(){
    this.loginUser$.next(null);
  }

}
