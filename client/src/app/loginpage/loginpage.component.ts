import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  login: boolean = true; // switch between Login and SignUp
  email: string = '';
  password: string = '';
  register: boolean = false;
staffMember;

  constructor(private authService: AuthenticationService, private fb: FormBuilder) { }
  
  ngOnInit() {
    this.staffMember = this.fb.group({
      email: ['', Validators.required, Validators.email],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      bipperExtension: ['',Validators.required],
      type: ['',Validators.required],
      phone: [''],
    });
  
  }

  onSubmit() { this.authService.loginStaff(this.email, this.password); }



  cancel() {
    this.register = false;

  }


}
