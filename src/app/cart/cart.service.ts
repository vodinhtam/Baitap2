import { Injectable } from '@angular/core';
import { Cart } from './cart.model';
import { ListItem } from '../shared/list-item.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService{
  cart = new Cart('1', [])

  public sumItems$ = new BehaviorSubject<number>(0);

  constructor(){}

  getToTalPrice(){
    return this.cart.items.reduce((x, item) => x + (item.quantity * item.product.price),0)
  }

  addItem(listItem: ListItem){
    let itemFound = (this.cart.items).find(x => x.product.id === listItem.product.id)

    if(itemFound !== undefined){
      itemFound.quantity += listItem.quantity
    } else {
      this.cart.items.push(listItem);
    }
    
    this.sumItems$.next(this.cart.items.reduce((x, {quantity}) => x + quantity, 0))
  }

  //filter condition should be Id, not the whole item (x.id !== item.id)
  removeItem(item: ListItem){
    this.cart.items = this.cart.items.filter(x => x.product.id !== item.product.id);

    this.sumItems$.next(this.cart.items.reduce((x, {quantity}) => x + quantity, 0))
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

    this.sumItems$.next(this.cart.items.reduce((x, {quantity}) => x + quantity, 0))
  }

}
