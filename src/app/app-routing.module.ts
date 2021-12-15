import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';
import { LoginComponent } from './component/login/login.component';
import { AdminPanelComponent } from './component/admin/admin-panel/admin-panel.component';
import { CreateProductComponent } from './component/admin/create-product/create-product.component';

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
    path: 'admin',
    component: AdminPanelComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'create-product',
    component: CreateProductComponent
  },
  {
    path: '**',
    redirectTo: '/index',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
