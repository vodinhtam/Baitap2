import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListItem } from 'src/app/shared/list-item.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  selectedItem: Product;

  constructor(private productService: ProductService, private cartService: CartService, private ngbModal: NgbModal) { }

  ngOnInit(): void {
    this.products = this.productService.products;
  }

  onAddProduct(id: string, quantity: string) {
    let product = this.productService.getProduct(id)

    this.cartService.addItem({ product: product, quantity: +quantity })
  }

  onFilterProduct(value: string) {
    this.products = this.productService.products;
    if (value === 'p') {
      this.products = this.products.filter(x => x.category === 'Phone')
    }
    if (value === 't') {
      this.products = this.products.filter(x => x.category === 'Tablet')
    }
    if (value === 'l') {
      this.products = this.products.filter(x => x.category === 'Laptop')
    }
    if (value === 'sw') {
      this.products = this.products.filter(x => x.category === 'SmartWatch')
    }
  }

  onSelectItem(item: Product, content: any) {
    this.selectedItem = item

    //open modal
    this.ngbModal.open(content);
  }

  // onAddItem(item: Product, qty: string) {
  //   this.cartService.addItem(new ListItem(item, (+qty)))
  //   alert('Added to list ' + qty + ' item"' + item.name + '"')
  // }
}
