import { Component, OnInit, DoCheck } from '@angular/core';
import { Cart } from '../cart.model';
import { CartService } from '../cart.service';
import { ListItem } from '../../shared/list-item.model';
import { faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-main',
  templateUrl: './cart-main.component.html',
  styleUrls: ['./cart-main.component.css']
})
export class CartMainComponent implements OnInit, DoCheck {
  cart: Cart;
  totalPrice: number;
  plusIcon = faPlusSquare;
  minusIcon = faMinusSquare;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }
  ngDoCheck(): void {
    this.cart = this.cartService.cart
    this.totalPrice = this.cartService.getToTalPrice()
  }

  onRemoveItem(item: ListItem){
    this.cartService.removeItem(item);
  }

  onChangeQuantity(item: ListItem, status: boolean){
    if (item.quantity === 1 && status === false) {
      if (!confirm("Are you sure to remove this item?")) {
        return
      }
    }
    this.cartService.changeQuantity(item, status);

  }

}
