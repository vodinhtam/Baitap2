import { Router } from '@angular/router';
import { AccountService } from '../../service/account.service';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { faCartPlus, faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../service/cart.service';
import { Subscription } from 'rxjs';
import { Account } from '../../model/account.model';
import { ListItem } from '../../model/list-item.model';
import { Cart } from '../../model/cart.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  cartIcon = faCartPlus;
  subscription = new Subscription();

  numberOfItems = 0;
  cart: Cart;
  sumPrice = 0;

  minusIcon = faMinusSquare;
  plusIcon = faPlusSquare;

  @Output() displayContent = new EventEmitter<string>()
  @Output() categorySelected = new EventEmitter<string>()

  @Input() loginUser: Account;


  constructor(private cartService: CartService, private accService: AccountService, private router: Router) { }

  ngOnInit(): void {
    if (this.loginUser) {
      this.subscription.add(this.cartService.getObjPipe(this.loginUser.username).subscribe((data) => {
        this.cart = data.cart;
        this.numberOfItems = data.sumItem;
        this.sumPrice = data.sumPrice;
      }));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSelectCategory(category: string) {
    this.displayContent.emit('list')
    this.categorySelected.emit(category)
  }

  onSelectCart() {
    this.displayContent.emit('cart')
  }

  onLogOut() {
    this.accService.logOut();
    this.router.navigate(['login']);
  }

  onChangeQuantity(item: ListItem, status: boolean) {
    if (item.quantity === 1 && status === false) {
      if (!confirm("Are you sure to remove this items?")) {
        return;
      }
    }
    this.cartService.changeQuantity(this.loginUser.username, item, status);
  }

}
