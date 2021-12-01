import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log('Hai');
  }
}
