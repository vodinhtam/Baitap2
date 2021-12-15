import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwPaginationModule } from 'jw-angular-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePageComponent } from './component/home-page/home-page.component';
import { ProductListCategoryComponent } from './component/product/product-list-category/product-list-category.component';
import { CartMainComponent } from './component/cart-main/cart-main.component';
import { ProductListComponent } from './component/product/product-list/product-list.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { SelectQuantityComponent } from './shared/select-quantity/select-quantity.component';
import { LoginComponent } from './component/login/login.component';
import { VndCurrencyPipe } from './pipes/vnd-currency.pipe';
import { AdminPanelComponent } from './component/admin/admin-panel/admin-panel.component';
import { CreateProductComponent } from './component/admin/create-product/create-product.component';
import { ShortenTextPipe } from './pipes/shorten-text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ProductListCategoryComponent,
    CartMainComponent,
    ProductListComponent,
    NavBarComponent,
    SelectQuantityComponent,
    LoginComponent,
    VndCurrencyPipe,
    AdminPanelComponent,
    CreateProductComponent,
    ShortenTextPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    JwPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
