// Imports Modules from npm dependencies
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { axios } from '@angular/axios';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
// import { Routes, RouterModule } from '@angular/router';


// imports modules from angular material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';



// Imports from the primeNg
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from "primeng/divider";
// import { MessageService } from 'primeng/api';

// imports Modules from internal dependencies
import { UserDashboardModule} from './user-dashboard/user-dashboard.module';

// Imports components from Internal dependencies
import { AppComponent } from './app.component';
import { SignupComponent } from './global_components/signup/signup.component';
import { LoginComponent } from './global_components/login/login.component';
import { ChangepasswordComponent } from './global_components/changepassword/changepassword.component';
import { ForgotpasswordComponent } from './global_components/forgotpassword/forgotpassword.component';

import { PagenotfoundComponent } from './global_components/pagenotfound/pagenotfound.component';
import { NotificationsComponent } from './global_components/notifications/notifications.component';



@NgModule({
  // Imported components
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ChangepasswordComponent,
    ForgotpasswordComponent,
    PagenotfoundComponent,
    NotificationsComponent,
  ],
  // Imported Internal Modules
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // Internal dependencies
    UserDashboardModule,

    // other modules
    HttpClientModule,

    // Angular material
    MatSidenavModule,
    MatSnackBarModule,
    MatDialogModule,

    //primeNg modules
    InputTextModule,
    ToastModule,
    PasswordModule,
    DividerModule,
    // MessageService,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
