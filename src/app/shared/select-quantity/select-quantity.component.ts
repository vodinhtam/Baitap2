import { Subscription } from 'rxjs';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../service/cart.service';
import { Product } from '../../model/product.model';
import { ListItem } from '../../model/list-item.model';
import { AccountService } from '../../service/account.service';

@Component({
  selector: 'app-select-quantity',
  templateUrl: './select-quantity.component.html',
  styleUrls: ['./select-quantity.component.css']
})
export class SelectQuantityComponent implements OnInit, OnDestroy{
  iconBack = faMinusCircle;
  iconForward = faPlusCircle;
  quantity: number = 1;
  loginUser: string;
  subscription = new Subscription();

  @Input() product: Product;

  constructor(private cartService: CartService, private accService: AccountService) { }

  ngOnInit(): void {
    this.subscription.add(this.accService.loginUser$.subscribe(data => {
      if (data) {
        this.loginUser = data.username
      }
    }));
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
  
  onChangeQty(x: boolean){
    if(x){
      this.quantity += 1;
    } else {
      if (this.quantity !== 1) {
        this.quantity -= 1
      }
    }
  }

  onAddItem(){
    this.cartService.addItem(this.loginUser, new ListItem(this.product, this.quantity))
    // alert('Added to list ' + this.quantity + ' item"' + this.product.name + '"')
    this.quantity = 1
  }

}
