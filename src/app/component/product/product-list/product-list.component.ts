
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  categoryList = ['Phone', 'Tablet', 'Laptop', 'SmartWatch']
  mappedProducts: {};
  keySets: string[] = [];
  subscription = new Subscription(); 

  @Input() categorySelected: string;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.subscription.add(this.productService.products$.subscribe(
      products => this.mappedProducts = this.formattedProducts(products)
    ))
    this.keySets = this.objectKey(this.mappedProducts);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  objectKey(obj: {}) {
    return Object.keys(obj);
  }

  formattedProducts(products: Product[]){
    return this.productService.getFormattedProducts(products);
  }
}
