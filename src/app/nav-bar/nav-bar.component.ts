import { AccountService } from './../shared/account.service';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../cart/cart.service';
import { Subscription } from 'rxjs';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  cartIcon = faCartPlus;
  numberOfItems = 0;
  subscription: Subscription;
  
  @Output() displayContent = new EventEmitter<string>()

  @Input() loginUser: string;


  constructor(private cartService: CartService, private productService: ProductService, private accService: AccountService) { }

  ngOnInit(): void {
    this.subscription = this.cartService.sumItems$.subscribe((x) => {this.numberOfItems = x})
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  onSelectCategory(category: string){
    this.displayContent.emit('list')
    this.productService.filterCategory(category);
  }

  onSelectCart(){
    this.displayContent.emit('cart')
  }

  onLogOut(){
    this.accService.logOut();
  }

}
