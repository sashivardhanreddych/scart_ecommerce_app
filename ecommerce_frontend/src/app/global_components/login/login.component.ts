import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from './../../services/global.service';  
import { NotificationsService } from '../../services/notifications.service';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  appendImageUrl = environment.appendImageUrl;
  // myGroup form variable to create new FormGroup
  myGroup: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private fb: FormBuilder,
    public global_obj: GlobalService,
    private notificationsService: NotificationsService,
    private userService: UserService
  ) {
    // checking the validations and error handling for the form fields
    this.myGroup = fb.group({
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ],
      ],
    });
  }

  // Using this to get the form controls and used in the template view
  get f() {
    return this.myGroup.controls;
  }
  // Used to show the object in the console when login the user
  onLogin(userObj: any) {
    console.log(this.myGroup.value);
    this.global_obj.loginUser(userObj).subscribe(
      (res) => {
        console.log(res);

        if (res.message === 'Succesfully loggedin') {
          this.global_obj.saveToken(res.signedToken);
          this.global_obj.isLoggedin = true;
          this.global_obj.setLoggedin(true);
          this.notificationsService.showNotification(
            'Succesfully Logged in!',
            'OK',
            'success'
          );
          if (res.loggedInUser.image)
            res.loggedInUser.image =
              this.appendImageUrl + `${res.loggedInUser.image}`;
          else {
            res.loggedInUser.image = this.appendImageUrl + `default.jpeg`;
          }
          console.log('called here');
          // this.userService.setImageUrl(res.loggedInUser.image);
          this.global_obj.presentUser = res.loggedInUser;
          console.log(res.loggedInUser);
          if (this.global_obj.presentUser.role === 'user') {
            this.router.navigateByUrl('user/dashboard');
          } else {
            this.router.navigateByUrl('/admin/dashboard');
          }
        } else {
          this.global_obj.isLoggedin = false;
        }
      },
      (err) => {
        console.log('some error has ocured', err);
      }
    );
  }
}  
