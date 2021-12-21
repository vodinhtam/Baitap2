import { Component, OnInit, OnDestroy } from '@angular/core';
import { Account } from '../../model/account.model';
import { AccountService } from '../../service/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.css']
})
export class OrderManagerComponent implements OnInit, OnDestroy {
  loginUser: Account;
  subscription = new Subscription();

  constructor(
    private accService: AccountService
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.accService.loginUser$.subscribe(account => {
      this.loginUser = account;
    }))
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
