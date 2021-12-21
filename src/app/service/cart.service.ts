import { Injectable } from '@angular/core';
import { Cart } from '../model/cart.model';
import { ListItem } from '../model/list-item.model';
import { BehaviorSubject, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _carts: Cart[] = [
    new Cart('demo', []),
    new Cart('demo1', [])
  ];
  public carts$ = new BehaviorSubject<Cart[]>(this._carts);

  constructor(private router: Router) { }

  getCarts() {
    return [...this.carts$.getValue()];
  }

  createNewCart(username: string) {
    const carts = this.getCarts();
    carts.push(new Cart(username, []));
    this.carts$.next(carts);

    //? this.carts$.next(this.getCarts().concat(new Cart('username', [])));
  }

  setCartToEmpty(username: string){
    const carts = this.getCarts();
    const currentCart = carts.find(x => x.username === username)
    if (currentCart) {
      currentCart.items = [];
      this.carts$.next(carts);
    }
  }

  addItem(username: string, listItem: ListItem) {
    const carts = this.getCarts();
    const cart = carts.find(data => data.username === username);

    if (cart) {
      const itemFound = cart.items.find(x => x.product.id === listItem.product.id);

      if (itemFound) {
        itemFound.quantity += listItem.quantity
      } else {
        cart.items.push(listItem);
      }

      this.carts$.next(carts);
    } else {
      if (confirm("You're not logged-in yet! Go to Login page?")) {
        this.router.navigate(["login"]);
      }
    }
  }

  removeItem(username: string, item: ListItem) {
    const carts = this.getCarts();
    const cart = carts.find(data => data.username === username);

    if (cart) {
      cart.items = cart.items.filter(x => x.product.id !== item.product.id);

      this.carts$.next(carts);
    } else {
      if (confirm("You're not logged-in yet! Go to Login page?")) {
        this.router.navigate(["login"]);
      } 
    }
  }

  changeQuantity(username: string, item: ListItem, status: boolean) {
    const carts = this.getCarts();
    const cart = carts.find(data => data.username === username);

    if (cart) {
      const itemFound = cart.items.find(x => x.product.id === item.product.id)

      if (itemFound) {
        if (status) {
          itemFound.quantity++
        } else {
          if (itemFound.quantity > 1) {
            itemFound.quantity--
          } else {
            cart.items = cart.items.filter(x => x.product.id !== itemFound.product.id);
            // this.removeItem(itemFound) => this.cart$.next duplicated
          }
        }
        this.carts$.next(carts);
      } else {
        alert('This item is not available!')
      }
    } else {
      if (confirm("You're not logged-in yet! Go to Login page?")) {
        this.router.navigate(["login"]);
      } 
    }
  }

  getObjPipe(username: string) {
    return this.carts$.pipe(map(carts => {
      const cart = carts.find(data => data.username === username);
      let sumPrice = 0;
      let sumItem = 0;
      if (cart) {
        sumPrice = cart.items.reduce((x, item) => x + (item.quantity * item.product.price), 0),
        sumItem = cart.items.reduce((x, { quantity }) => x + quantity, 0)
      }
      return {
        cart: cart,
        sumPrice: sumPrice,
        sumItem: sumItem
      }
      //có cần thiết return cả 3 ? => tách riêng 3 hàm ở dưới (getObjPipe là gì???)
    }))
  }

  getCart(username: string, carts: Cart[]){
    return carts.find(cart => cart.username === username);
  }

  getSumItem(username: string, carts: Cart[]){
    const cart = carts.find(cart => cart.username === username);
    if (cart) {
      return cart.items.reduce((x, { quantity }) => x + quantity, 0);
    } else {
      return 0;
    }
  }

  getSumPrice(username: string, carts: Cart[]){
    const cart = carts.find(cart => cart.username === username);
    if (cart) {
      return cart.items.reduce((x, item) => x + (item.quantity * item.product.price), 0);
    } else {
      return 0;
    }
  }

}
