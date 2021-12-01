// Imports from External Dependencies
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GlobalService } from './global.service';
import { LoaderService } from '../services/loader.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private loaderService: LoaderService
  ) {}

  // Imports from internal Dependencies
  private apiBaseUrl: string = environment.apiBaseUrl;
  private editProfileUrl = this.apiBaseUrl + 'user/editUserDetails';
  private getUserProfileUrl = this.apiBaseUrl + 'user/getUserProfile/';
  private connectUrl = this.apiBaseUrl + 'frnd/connect/';
  private getAllPostUrl = this.apiBaseUrl + 'post/getAllUserPosts/';
  private editProfilePicUrl = this.apiBaseUrl + 'user/updateProfilePic';
  private userActivityUrl = this.apiBaseUrl + 'user/activity/';
  private disConnectUrl = this.apiBaseUrl + 'frnd/disConnect/';

  public imageUrl = new Subject<string>();

  // Used to set image and next image 
  setImageUrl(image: string) {
    console.log('updating userImage');
    console.log(image);
    this.imageUrl.next(image);
  }

  // Used to Edit user details 
  editUserDetails(userObj:any) {
    console.log('in editUserDetails');
    return this.http.patch<any>(this.editProfileUrl, userObj);
  }

  // Update the user Profile fic
  updateProfilePic(formData:any) {
    return this.http.post<any>(this.editProfilePicUrl, formData);
  }

  // Used to get User Profile
  getUserProfile(obj:any) {
    console.log(this.getUserProfileUrl + obj.userId);
    return this.http.post<any>(this.getUserProfileUrl + obj.userId, obj);
  }

  // Used to connect 
  onConnect(obj:any) {
    return this.http.post<any>(this.connectUrl + obj.curUserId, obj);
  }

  // Used to disconnect the user
  onDisconnect(obj:any) {
    console.log('in disconect method');
    console.log(this.disConnectUrl + obj.curUserId);
    return this.http.post<any>(this.disConnectUrl + obj.curUserId, obj);
  }

  // Used to User activity
  getUserActivity(id: number) {
    console.log(this.userActivityUrl + id);
    return this.http.get<any>(this.userActivityUrl + id);
  }
}
