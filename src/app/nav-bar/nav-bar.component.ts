import { Component, OnInit, DoCheck } from '@angular/core';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, DoCheck {
  cartIcon = faCartPlus;
  numberOfItems: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }
  
  ngDoCheck(): void {
    this.numberOfItems = this.cartService.getNumberOfItems() 
  }

}
