import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cart } from '../../model/cart.model';
import { CartService } from '../../service/cart.service';
import { ListItem } from '../../model/list-item.model';
import { faMinusSquare, faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-main',
  templateUrl: './cart-main.component.html',
  styleUrls: ['./cart-main.component.css']
})
export class CartMainComponent implements OnInit, OnDestroy {
  cart: Cart;
  totalPrice: number;
  plusIcon = faPlusSquare;
  minusIcon = faMinusSquare;
  removeIcon = faTrashAlt;
  subscription = new Subscription();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.subscription.add(this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.totalPrice = this.cartService.getSumPrice(cart);
    }))
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onRemoveItem(item: ListItem) {
  if (!confirm("Are you sure to remove this item?")) {
        return
      }
    this.cartService.removeItem(item);
  }

  onChangeQuantity(item: ListItem, status: boolean) {
    if (item.quantity === 1 && status === false) {
      if (!confirm("Are you sure to remove this item?")) {
        return
      }
    }
    this.cartService.changeQuantity(item, status);
  }

}
