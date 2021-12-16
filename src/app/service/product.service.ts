import { Injectable } from '@angular/core';

import { Product } from '../model/product.model';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [
    new Product('P1', 'Iphone X', 'Phone', 'https://cdn.tgdd.vn/Products/Images/42/114115/iphone-x-64gb-hh-600x600.jpg', 12000000),
    new Product('P2', 'Samsung Galaxy Fold3', 'Phone', 'https://cdn.tgdd.vn/Products/Images/42/226935/Slider/samsung-galaxy-z-fold-3-slider-tong-quan-1020x570.jpg', 41990000),
    new Product('P4', 'Xiaomi 11T Pro', 'Phone', 'https://cdn.tgdd.vn/Products/Images/42/248218/xiaomi-11t-pro-blue-1-600x600.jpg', 14990000),
    new Product('P3', 'Điện thoại Vivo X70 Pro 5G', 'Phone', 'https://cdn.tgdd.vn/Products/Images/42/248099/vivo-x70-pro-xanh-1-1.jpg', 18990000),
    new Product('L1', 'Acer Nitro 5 Gaming AN515', 'Laptop', 'https://cdn.tgdd.vn/Products/Images/44/247243/acer-nitro-5-gaming-an515-57-727j-i7-nhqd9sv005-4.jpg', 28190000),
    new Product('L2', 'MacBook Pro 14 M1 Pro 2021', 'Laptop', 'https://cdn.tgdd.vn/Products/Images/44/253581/Slider/vi-vn-apple-pro-14-m1-pro-2021-8-core-cpu-16gb-1.jpg', 52990000),
    new Product('L3', 'MSI Katana Gaming GF66', 'Laptop', 'https://cdn.tgdd.vn/Products/Images/44/242201/Slider/vi-vn-msi-gf66-11uc-i7-224vn.jpg', 28290000),
    new Product('T1', 'iPad Pro M1 12.9 inch', 'Tablet', 'https://cdn.tgdd.vn/Products/Images/522/238649/Slider/ipad-pro-m1-129-inch-wifi-cellular-128gb-2021-240521-03505210.jpg', 36490000),
    new Product('T2', 'Samsung Galaxy Tab S7', 'Tablet', 'https://cdn.tgdd.vn/Products/Images/522/225031/Slider/-samsung-galaxy-tab-s7-1z.jpg', 18990000),
    new Product('T3', 'Huawei MatePad 11', 'Tablet', 'https://cdn.tgdd.vn/Products/Images/522/241299/Slider/huawei-matepad-11-tinhnang-1020x570.jpg', 13990000),
    new Product('S1', 'Apple Watch S6 40mm', 'SmartWatch', 'https://cdn.tgdd.vn/Products/Images/7077/229044/Slider/apple-watch-s6-40mm-vien-nhom-day-cao-su-221020-1219320.jpg', 11990000),
    new Product('S2', 'Garmin Venu 2', 'SmartWatch', 'https://cdn.tgdd.vn/Products/Images/7077/241947/Slider/vi-vn-venu-2-day-silicone-xanh-fix-(1).jpg', 9990000),
    new Product('S3', 'Samsung Galaxy Watch 4', 'SmartWatch', 'https://cdn.tgdd.vn/Products/Images/7077/248761/Slider/vi-vn-samsung-galaxy-watch-4-classic-46mm-12-fix1.jpg', 8990000),
  ]

  products$ = new BehaviorSubject<Product[]>(this.products);


  getProducts(){
    return this.products$.getValue();
  }

  addProduct(product: Product) {
    let updatedProducts = this.getProducts();
    updatedProducts.push(product);

    this.products$.next(updatedProducts);
  }

  removeProduct(productId: string) {
    let updatedProducts = this.getProducts();

    //sử dụng khi remove các properties khác có value giống nhau
    // updatedProducts = updatedProducts.filter(x => x.id !== productId);

    const index = updatedProducts.findIndex(x => x.id === productId);
    if (index > -1) {
      updatedProducts.splice(index,1);
    }
    //data ko thay đổi ko cần update
    this.products$.next(updatedProducts);
  }

  generateProductId(category: string) {
    let idListSorted: string[];
    let currentMaxId: string;


    idListSorted = this.products.filter(a => a.category === category).map(x => x.id).sort();
    currentMaxId = idListSorted[idListSorted.length - 1];

    return currentMaxId.slice(0, 1) + (+currentMaxId.slice(1) + 1);
  }

  onChangeCategory(category: string){
    return this.products$.pipe(map((data) => data.filter(x => !category ? true : x.category === category)))
  }

  getFormattedProducts(products: Product[]){
    return products.reduce((prev, now) => {
      if (!prev[now.category]) {
        prev[now.category] = [];
      }

      prev[now.category].push(now);
      return prev;
    }, {});

    // data trả về có dạng:
    // {
    //    category1 : [{1st-product-in-category1},..., {n-product-in-category1}],
    //    ...
    //    categoryx : [{1st-product-in-categoryx},..., {n-product-in-categoryx}],
    // }

    //MappedProduct[] => tạo model dạng này
  }



}
