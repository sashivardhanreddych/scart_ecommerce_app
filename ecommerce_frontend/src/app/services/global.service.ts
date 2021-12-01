// Imports from external(npm) dependencies
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

// Imports form Internal dependencies
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  // Backend common url
  apiBaseUrl: string = environment.apiBaseUrl;

  // Backend respective component Url's
  changePasswordUrl = this.apiBaseUrl + 'changepassword';
  resetUrl = this.apiBaseUrl + 'resetpassword';
  forgotUrl = this.apiBaseUrl + 'forgotpassword';
  loginUrl = this.apiBaseUrl + 'login';
  registerUrl = this.apiBaseUrl + 'signup';
  presentUser: any;

  constructor(private http: HttpClient, private router: Router) {}

  // Declaring isLoggedin and creating a subject
  isLoggedin = false;
  public loggedInSubject = new Subject<boolean>();

  // setLoggedin used to tell a user login
  setLoggedin(value: boolean) {
    this.loggedInSubject.next(value);
  }
  // register user to send the data to server
  registerUser(userObj: any) {
    return this.http.post<any>(this.registerUrl, userObj);
  }

  // login user to send the data to server
  loginUser(userObj: any) {
    return this.http.post<any>(this.loginUrl, userObj);
  }

  // when user login the token will save in the s-cart token
  saveToken(token: string) {
    localStorage.setItem('SCART', token);
  }

  // when user logout the token will remove from the s-cart token
  removeToken() {
    localStorage.removeItem('SCART');
  }

  // To get the SCART token from localstorage
  getToken(token: string) {
    return localStorage.getItem('SCART');
  }

  // Used to send the data to server
  onForgot(userObj: any) {
    return this.http.post<any>(this.forgotUrl, userObj);
  }

  // Used to reset the password and change the url
  onReset(userObj: any, token: string) {
    this.resetUrl = this.resetUrl + '/' + token;
    console.log(this.resetUrl);
    return this.http.patch<any>(this.resetUrl, userObj);
  }

  // Used to change the password 
  onChangePassword(userObj: any) {
    return this.http.patch<any>(this.changePasswordUrl, userObj);
  }

  // Used to authenticate the user
  isAuthenticated(): boolean {
    console.log('in global service authGuard');

    if (
      localStorage.getItem('SCART') == undefined ||
      localStorage.getItem('SCART') == null
    ) {
      console.log(false);
      return false;
    } else {
      console.log(true);
      return true;
    }
  }

  // logout the user and expired the token
  logout() {
    this.removeToken();
    this.isLoggedin = false;
    this.router.navigateByUrl('/login');
    this.setLoggedin(false);
  }
}
