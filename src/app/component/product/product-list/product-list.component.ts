
import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  categoryList = ['Phone', 'Tablet', 'Laptop', 'SmartWatch']
  mappedProducts: {};
  keySets: string[] = [];

  @Input() categorySelected: string;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.mappedProducts = this.formattedProducts();
    this.keySets = this.objectKey(this.mappedProducts);
  }

  getList(category: string){
    return this.productService.getListByCategory(category)
  }

  
  objectKey(obj: {}) {
    return Object.keys(obj);
  }

  formattedProducts(){
    return this.productService.getFormattedProducts();
  }
}
