import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsComponent } from '../global_components/notifications/notifications.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private snackBar: MatSnackBar) {}

  // It push the Notifications
  showNotification(displayMessage:string,buttonText:string,messageType:'error'|'success') {
    this.snackBar.openFromComponent(NotificationsComponent, {
      data: {
        message: displayMessage,
        buttonText: buttonText,
         messageType:messageType
      },
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass:messageType
    });
  }
}