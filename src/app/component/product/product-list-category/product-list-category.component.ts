import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

import { Product } from '../../../model/product.model';
import { ProductService } from '../../../service/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list-category',
  templateUrl: './product-list-category.component.html',
  styleUrls: ['./product-list-category.component.css']
})
export class ProductListCategoryComponent implements OnInit, OnChanges, OnDestroy {
  @Input() category: string;
  products: Product[]
  subscription = new Subscription();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.subscription.add(this.productService.onChangeCategory(this.category).subscribe((data) => {this.products = data}))
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

}
