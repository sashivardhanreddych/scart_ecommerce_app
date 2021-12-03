import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsService } from '../../services/notifications.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  constructor(
    public global_obj: GlobalService,
    private user_obj: UserService,
    private route: Router,
    private matSnackBar: MatSnackBar,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    // console.log('Hi');
    this.user_obj.imageUrl.subscribe((data) => {
      console.log('subscribing data');
      console.log(data);
      // this.userImageUrl = data;
    });
    // console.log(this.global_obj.presentUser?.dob.split('T')[0]);

    // this.name = this.global_obj.presentUser?.name;
    // this.gender = this.global_obj.presentUser?.gender;
    // this.age = this.global_obj.presentUser?.age;
    // this.mobile_number = this.global_obj.presentUser?.mobile_number;
    // this.dob = this.global_obj.presentUser?.dob.split('T')[0];
  }
  onSubmit(): void {}

  updateProfilePic() {
    let formData = new FormData();
  //   // if (this.sampleFile) {
  //   //   formData.append('sampleFile', this.sampleFile);
  //   //   this.user_obj.updateProfilePic(formData).subscribe((res) => {
  //   //     console.log('100');
  //   //     console.log(res);
  //   //     if (res.userobj.image) {
  //   //       res.userobj.image = this.appendImageUrl + res.userobj.image;
  //   //     }

  //       this.user_obj.setImageUrl(res.userobj.image);
  //       this.global_obj.presentUser = res.userobj;
  //       this.matSnackBar.open('Succesfully updated Profile Pic', 'dismiss', {
  //         duration: 500,
  //       });
  //     });
  //   } else {
  //     this.matSnackBar.open(
  //       'No file is selected, Please select a file!',
  //       'dismiss'
  //     );
  //   }
  // }
  // handleFileInput(file) {
  //   this.sampleFile = file[0];
  //   console.log(file[0]);
  // }
  // editDetailsHandler() {
  //   this.isDisabled = false;
  // }
  // cancelHandler() {
  //   this.isDisabled = true;
  //   this.name = this.global_obj.presentUser?.name;
  //   this.gender = this.global_obj.presentUser?.gender;
  //   this.age = this.global_obj.presentUser?.age;
  //   this.mobile_number = this.global_obj.presentUser?.mobile_number;
  //   this.dob = this.global_obj.presentUser?.dob.split('T')[0];
  // }
  // updateHandler() {
  //   let user = {
  //     name: this.name,
  //     age: this.age,
  //     dob: this.dob,
  //     mobile_number: this.mobile_number,
  //     gender: this.gender,
  //   };
  //   console.log(this.dob);
  //   this.user_obj.editUserDetails(user).subscribe((response) => {
  //     console.log(response);
  //     if (response.userObj.image) {
  //       response.userObj.image = this.appendImageUrl + response.userObj.image;
  //     } else {
  //       response.userObj.image = this.appendImageUrl + 'default.jpeg';
  //     }
  //     this.global_obj.presentUser = response.userObj;
  //     this.ngOnInit();
  //     this.notificationsService.showNotification(
  //       'Succesfully updated your details',
  //       'OK',
  //       'success'
  //     );
  //   });
  }
}
