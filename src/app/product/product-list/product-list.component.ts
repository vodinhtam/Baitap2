import { Product } from './../product.model';
import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, DoCheck {
  products: Product[];
  selectedItem: Product;
  @Input() categorySelected: string;

  constructor(private productService: ProductService, private cartService: CartService, private ngbModal: NgbModal) { }

  ngOnInit(): void {
    this.products = this.productService.products;
  }

  ngDoCheck(): void {
    this.products = this.productService.products;
    if (this.categorySelected === 'p') {
      this.products = this.products.filter(x => x.category === 'Phone')
    }
    if (this.categorySelected === 't') {
      this.products = this.products.filter(x => x.category === 'Tablet')
    }
    if (this.categorySelected === 'l') {
      this.products = this.products.filter(x => x.category === 'Laptop')
    }
    if (this.categorySelected === 'sw') {
      this.products = this.products.filter(x => x.category === 'SmartWatch')
    }
  }

  onAddProduct(id: string, quantity: string) {
    let product = this.productService.getProduct(id)

    this.cartService.addItem({ product: product, quantity: +quantity })
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
