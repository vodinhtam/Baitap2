import { Injectable } from '@angular/core';
import { Cart } from './cart.model';
import { ListItem } from '../shared/list-item.model';
import { ifStmt } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class CartService{

  cart = new Cart('1', [])

  constructor(){}

  getToTalPrice(){
    let totalPrice: number = 0;

    this.cart.items.forEach(product => {
      totalPrice += (product.quantity * product.product.price)
    });

    return totalPrice;
  }

  addItem(listItem: ListItem){
    let itemFound = (this.cart.items).find(x => x.product.id === listItem.product.id)

    if(itemFound !== undefined){
      itemFound.quantity += listItem.quantity
    } else {
      this.cart.items.push(listItem);
    }
  }

  removeItem(item: ListItem){
    this.cart.items = this.cart.items.filter(x => x !== item);
  }

  getNumberOfItems(){
    let numberOfItems = 0;
    this.cart.items.forEach(itemList => {
      numberOfItems += itemList.quantity
    });
    return numberOfItems;
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
  }

}
