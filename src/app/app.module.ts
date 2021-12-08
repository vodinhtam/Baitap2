import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwPaginationModule } from 'jw-angular-pagination';
import { FormsModule } from '@angular/forms';

import { HomePageComponent } from './home-page/home-page.component';
import { ProductMainComponent } from './product/product-main/product-main.component';
import { CartMainComponent } from './cart/cart-main/cart-main.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { SelectQuantityComponent } from './shared/select-quantity/select-quantity.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductMainComponent,
    CartMainComponent,
    ProductListComponent,
    NavBarComponent,
    ProductDetailComponent,
    SelectQuantityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    JwPaginationModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
