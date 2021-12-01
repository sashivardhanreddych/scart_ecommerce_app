//imports Modules from npm dependencies
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//imports Components from internal dependencies
import { PagenotfoundComponent } from '../global_components/pagenotfound/pagenotfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { ProductsTableComponent } from './products-table/products-table.component';

// Routes Array to navigate from one page to another page and children array of routes
const routes: Routes = [
  { path: '', redirectTo: 'user/dashboard', pathMatch: 'full' },
  {
    path: 'user/dashboard', component: DashboardComponent,
    children: [ 
      { path: 'products', component: ProductsComponent},
      { path : 'cart', component: CartComponent},
      { path : 'pro', component: ProductsTableComponent}
    ]
  },
  {path: '**', component: PagenotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDashboardRoutingModule { }
