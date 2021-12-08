import { Component, OnInit} from '@angular/core';
import { Cart } from '../cart/cart.model';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  cart: Cart;
  totalPrice: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart = this.cartService.cart;
  }

}
