import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { Subscription } from 'rxjs';
import { Account } from '../../model/account.model';
import { Product } from '../../model/product.model';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy{
  categorySelected: string;
  displayContent = 'list';
  loginUser: Account;

  products: Product[];

  subscription = new Subscription();

  constructor(private accountService: AccountService, private proService: ProductService) { }

  ngOnInit(): void {
    this.subscription.add(this.accountService.loginUser$.subscribe((data) => {this.loginUser = data})); 
    this.products = this.proService.products
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
