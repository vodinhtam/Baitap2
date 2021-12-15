import { Injectable } from '@angular/core';
import { Cart } from '../model/cart.model';
import { ListItem } from '../model/list-item.model';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService{
  cart = new Cart('1', [])

  //sử dụng để thao tác cho các method bên dưới - thay thế luôn cho sumItem
  public cart$ = new BehaviorSubject<Cart>(this.cart);
  public sumItems$ = new BehaviorSubject<number>(0);
  public sumPrice$ = new BehaviorSubject<number>(0);

  constructor(){}

  getCart(){
    return this.cart$.getValue();
  }
  updateToTalPrice(){
    this.sumPrice$.next(this.getCart().items.reduce((x, item) => x + (item.quantity * item.product.price),0)) 
  }

  updateToTalItems(){
    this.sumItems$.next(this.getCart().items.reduce((x, {quantity}) => x + quantity, 0))
  }

  addItem(listItem: ListItem){
    let cart = this.getCart();
    let itemFound = cart.items.find(x => x.product.id === listItem.product.id)
    
    if(itemFound){
      itemFound.quantity += listItem.quantity
    } else {
      this.cart.items.push(listItem);
    }

    this.cart$.next(cart)
    this.updateToTalItems()
    this.updateToTalPrice()
  }

  //filter condition should be Id, not the whole item (x.id !== item.id)
  removeItem(item: ListItem){
    this.cart.items = this.cart.items.filter(x => x.product.id !== item.product.id);

    this.updateToTalItems()
    this.updateToTalPrice()
  }

  changeQuantity(item: ListItem, status: boolean){
    if(status){
      item.quantity++
    } else {
      if (item.quantity > 1) {
        item.quantity--
      } else {
        this.removeItem(item)
      }
    }

    this.updateToTalItems()
    this.updateToTalPrice()
  }

}
