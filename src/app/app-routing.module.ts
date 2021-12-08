import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CartMainComponent } from './cart/cart-main/cart-main.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: HomePageComponent
  },
  {
    path: 'product-list',
    component: ProductListComponent
  },
  {
    path: 'cart',
    component: CartMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
