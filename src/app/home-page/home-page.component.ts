import { Component, OnInit, DoCheck } from '@angular/core';
import { AccountService } from '../shared/account.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, DoCheck{
  categorySelected: string;
  listOrCart = 'list';
  loginUser: string;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }
  
  ngDoCheck(): void {
    this.loginUser = localStorage.getItem('loginAccount')
  }
  
  doLogOut(e: boolean){
    if(e){
      this.accountService.logOut()
    }
  }

}
