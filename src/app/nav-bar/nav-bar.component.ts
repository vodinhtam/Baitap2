import { Component, OnInit, DoCheck, Output, EventEmitter, Input } from '@angular/core';
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
  
  @Output() categorySelected = new EventEmitter<string>()
  @Output() listOrCart = new EventEmitter<string>()
  @Output() isLogOut = new EventEmitter<boolean>()

  @Input() loginUser: string;


  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }
  
  ngDoCheck(): void {
    this.numberOfItems = this.cartService.getNumberOfItems() 
  }

  onSelectCategory(category: string){
    this.categorySelected.emit(category)
    this.listOrCart.emit('list')
  }

  onSelectCart(){
    this.listOrCart.emit('cart')
  }

  onLogOut(){
    this.isLogOut.emit(true)
    
  }

}
