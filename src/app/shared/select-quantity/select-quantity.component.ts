import { Component, Input, OnInit } from '@angular/core';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../service/cart.service';
import { Product } from '../../model/product.model';
import { ListItem } from '../../model/list-item.model';

@Component({
  selector: 'app-select-quantity',
  templateUrl: './select-quantity.component.html',
  styleUrls: ['./select-quantity.component.css']
})
export class SelectQuantityComponent implements OnInit {
  iconBack = faMinusCircle;
  iconForward = faPlusCircle;
  quantity: number = 1;

  @Input() product: Product;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
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
    this.cartService.addItem(new ListItem(this.product, this.quantity))
    // alert('Added to list ' + this.quantity + ' item"' + this.product.name + '"')
    this.quantity = 1
  }

}
