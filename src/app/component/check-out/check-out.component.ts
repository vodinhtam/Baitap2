import { Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Cart } from '../../model/cart.model';
import { Subscription } from 'rxjs';
import { CartService } from '../../service/cart.service';
import { AccountService } from '../../service/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  checkOutForm: FormGroup;
  subscription = new Subscription;

  user: string;
  @Output() displayList = new EventEmitter<void>();

  cart: Cart;
  totalPrice: number;
  totalItem: number;

  noticeIcon = faExclamationCircle;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private accService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.accService.loginUser$.subscribe(account => {
      this.user = account.username;
    }))
    this.subscription.add(this.cartService.getObjPipe(this.user).subscribe(obj => {
      this.cart = obj.cart;
      this.totalItem = obj.sumItem;
      this.totalPrice = obj.sumPrice;
    }))
    this.checkOutForm = this.fb.group({
      sumItems: [this.totalItem],
      sumPrice: [this.totalPrice],
      deliverTo: ['', [Validators.required]],
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCheckOut() {
    if (this.checkOutForm.invalid) {
      this.checkOutForm.markAllAsTouched();
    } else {
      let data = this.checkOutForm.getRawValue();
      this.accService.addNewOrder(this.user, data.sumItems, data.sumPrice, data.deliverTo);
      this.cartService.setCartToEmpty(this.user);
      alert('Your order has been received and handled by the system!');
      this.displayList.emit();
    }
  }

  onGoToHomePage(){
    if (confirm("Go back to home page?")) {
      this.displayList.emit();
    }
  }

}
