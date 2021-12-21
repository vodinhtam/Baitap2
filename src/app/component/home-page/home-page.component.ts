import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  categorySelected: string;
  displayContent = 'list';

  subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
  }


}
