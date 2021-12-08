import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart.model';
import { CartService } from '../cart.service';
import { ListItem } from '../../shared/list-item.model';

@Component({
  selector: 'app-cart-main',
  templateUrl: './cart-main.component.html',
  styleUrls: ['./cart-main.component.css']
})
export class CartMainComponent implements OnInit {
  cart: Cart;
  totalPrice: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart
    this.totalPrice = this.cartService.getToTalPrice()
  }

  onRemoveItem(item: ListItem){
    this.cartService.removeItem(item);
  }

}
