import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from '../shared/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy{
  categorySelected: string;
  displayContent = 'list';
  loginUser: string;

  subscription: Subscription;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.subscription = this.accountService.loginUser$.subscribe((data) => {this.loginUser = data})
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
