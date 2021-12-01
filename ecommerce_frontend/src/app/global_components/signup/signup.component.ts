// Imports from angular dependencies
import { Component, OnInit } from '@angular/core';
import { NgForm }   from '@angular/forms';
import { GlobalService } from './../../services/global.service';

import { Router } from '@angular/router';
import { NotificationsService } from './../../services/notifications.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    public globalObj: GlobalService,
    private router: Router,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {}

  /**
   * Used to send the data when submit button is clicked
   * @param x userdata
   * @returns String
   */
  onSubmit(userObj: NgForm) {
    console.log(userObj);
    // alert(x);
    this.globalObj.registerUser(userObj).subscribe(
      (res) => {
        console.log(res);

        this.notificationsService.showNotification(
          'Successfully Registered',
          'OK',
          'success'
        );
        this.router.navigateByUrl('/login');
      },
      (err) => {
        console.log('some Error occured during registration', err);
      }
    );
  }
}
