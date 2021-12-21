import { Injectable } from '@angular/core';
import { Account } from '../model/account.model';
import { BehaviorSubject,  } from 'rxjs';
import { CartService } from './cart.service';
import { Order } from '../model/order.model';
import { GuidHelper } from '../shared/guid.helper';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  accounts: Account[] = [
    new Account('demo', 'demo', false, [
      new Order('00b6f15c-b5c8-4c70-8c5a-286c4cc38b09', 2, 99700000, 'Hoi An'), 
      new Order('9c17ddc5-7aae-41e3-9b59-4f410b7c7de7', 4, 112500000, 'Hoi An')
    ]),
    new Account('demo1', 'demo', false, []),
    new Account('username', 'password', true, [])
  ]

  accounts$ = new BehaviorSubject<Account[]>(this.accounts);
  loginUser$ = new BehaviorSubject<Account>(this.getAccount('username'));

  constructor(private cartService: CartService){}

  getAccounts(){
    return [...this.accounts$.getValue()];
  }

  getAccount(username: string){
    return this.getAccounts().find(x => x.username === username);
  }

  addAccount(username: string, password: string, isAdmin: boolean){
    const newAcc = new Account(username, password, isAdmin, []);
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

  addNewOrder(username: string, sumItems: number, sumPrice: number, deliverTo: string){
    const accounts = this.getAccounts();
    const currentUser = accounts.find(acc => acc.username === username);
    if (currentUser) {
      currentUser.orders.push(new Order(GuidHelper.newGuid(), sumItems, sumPrice, deliverTo));
      this.accounts$.next(accounts);
    }
  }

}
