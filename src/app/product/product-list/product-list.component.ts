import { Product } from './../product.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../../cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  selectedItem: Product;
  @Input() categorySelected: string;

  subscription: Subscription;

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.subscription = this.productService.products$.subscribe((data) => this.products = data)
  }

  onAddProduct(id: string, quantity: string) {
    let product = this.productService.getProduct(id)

    this.cartService.addItem({ product: product, quantity: +quantity })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }
}
