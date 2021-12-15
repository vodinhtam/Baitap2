import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../service/product.service';
import { Account } from '../../../model/account.model';
import { AccountService } from '../../../service/account.service';
import { Product } from '../../../model/product.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit, OnDestroy {
  loginUser: Account
  viewListToggle = true;
  mappedProducts: {};
  subscription = new Subscription();

  constructor(private productService: ProductService, private accService: AccountService) { }

  ngOnInit(): void {
    this.subscription.add(this.accService.loginUser$.subscribe((logAcc) => this.loginUser = logAcc));
    this.subscription.add(this.productService.products$.subscribe((products) => this.mappedProducts = this.formattedProducts(products)));
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

  onToggleViewList(){
    this.viewListToggle = !this.viewListToggle;
  }

  onRemoveProduct(productid: string){
    if (confirm("Are you sure want to delete this item?")) {
      this.productService.removeProduct(productid);
    }
  }

}
