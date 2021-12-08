import { Component, Input, OnInit } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import { Product } from '../product.model';
import { CartService } from '../../cart/cart.service';
import { ListItem } from 'src/app/shared/list-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() selectedItem: Product;
  selectedQuantity: number = 0;

  cartIcon = faCartPlus;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  onAddToList() {
    this.cartService.addItem(new ListItem(this.selectedItem, this.selectedQuantity))
    
    alert('Added to list ' + this.selectedQuantity + ' item"' + this.selectedItem.name + '"')

    this.selectedQuantity = 0;
  }

  onClose(){

  }

}
