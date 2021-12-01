import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { MessageService } from 'primeng/api';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css'],
  // providers: [MessageService]
})
export class ChangepasswordComponent implements OnInit {
  constructor(
    // public messageService: MessageService,
    private global_obj: GlobalService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    // this.messageService.add({
    //   severity: 'success',
    //   summary: 'Service Message',
    //   detail: 'Via MessageService',
    // });
  }

  newPassword: string = '';
  confirmPassword: string = '';
  token: string = '';


  ngOnInit(): void {}

  onSubmit() {
    console.log("newPassword");
  }
}
