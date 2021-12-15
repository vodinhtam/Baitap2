import { Injectable } from '@angular/core';
import { Cart } from '../model/cart.model';
import { ListItem } from '../model/list-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new Cart('1', [])

  public cart$ = new BehaviorSubject<Cart>(this.cart);

  constructor() { }

  getCart() {
    return this.cart$.getValue();
  }
  getSumPrice(cart: Cart) {
    return cart.items.reduce((x, item) => x + (item.quantity * item.product.price), 0);
  }

  getSumItem(cart: Cart) {
    return cart.items.reduce((x, { quantity }) => x + quantity, 0)
  }

  addItem(listItem: ListItem) {
    let cart = this.getCart();
    let itemFound = cart.items.find(x => x.product.id === listItem.product.id)

    if (itemFound) {
      itemFound.quantity += listItem.quantity
    } else {
      this.cart.items.push(listItem);
    }

    this.cart$.next(cart);
  }

  removeItem(item: ListItem) {
    let cart = this.getCart();
    cart.items = cart.items.filter(x => x.product.id !== item.product.id);

    this.cart$.next(cart);
  }

  changeQuantity(item: ListItem, status: boolean) {
    let cart = this.getCart();
    let itemFound = cart.items.find(x => x.product.id === item.product.id)

    if (itemFound) {
      if (status) {
        itemFound.quantity++
      } else {
        if (itemFound.quantity > 1) {
          itemFound.quantity--
        } else {
          this.removeItem(itemFound)
        }
      }
    }

    this.cart$.next(cart)
  }

}
