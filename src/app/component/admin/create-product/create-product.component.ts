import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../../model/product.model';

import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  createProductForm: FormGroup
  categoryList = ['Phone', 'Tablet', 'SmartWatch', 'Laptop']

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.createProductForm = this.fb.group({
      category: ['', Validators.required],
      name: ['', Validators.required],
      imgUrl: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1000)]]
    })
  }
  
  onCreateProduct(){
    if (this.createProductForm.invalid) {
      this.createProductForm.markAllAsTouched();
    } else {
      let data = this.createProductForm.getRawValue();
      let id = this.productService.generateProductId(data.category);
  
      this.productService.addProduct(new Product(id, data.name, data.category, data.imgUrl, data.price))

      alert("New product was created: id=" + id + ", name=" + data.name + ", category=" + data.category + ", imgUrl=" + data.imgUrl + ", price=" + data.price)

      this.router.navigate(["/admin"])
    }
  }

}
