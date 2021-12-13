import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product.model';
import { Subscription } from 'rxjs';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  viewListToggle = false;
  products: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.subscription = this.productService.products$.subscribe((data) => {this.products = data})
  }

  onToggleViewList(){
    this.viewListToggle = !this.viewListToggle
  }

}
