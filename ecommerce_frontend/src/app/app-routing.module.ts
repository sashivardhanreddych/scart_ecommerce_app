import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Imports components from internal dependencies
import { LoginComponent } from './global_components/login/login.component';
import { SignupComponent } from './global_components/signup/signup.component';
import { ForgotpasswordComponent } from './global_components/forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './global_components/changepassword/changepassword.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'changepassword', component: ChangepasswordComponent }
  // { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
