import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { StaffMember } from '../objects/staff-member.model';
import { AbstractControl } from '@angular/forms';
import { SelectItem } from 'primeng/api';
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
  registeredStaff: StaffMember;
  types: SelectItem[];

  constructor(private authService: AuthenticationService, private fb: FormBuilder) {
    this.types = [
      { label: "Staff", value: 2 },
      { label: "Medical Staff", value: 3 },
      { label: "Charged Nurse", value: 0 },
      { label: "Doctor", value: 1},

    ]
  }

  ngOnInit() {
    this.authService.logoutStaff();
    this.staffMember = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      bipperExtension: ['', Validators.required],
      type: ['', Validators.required],
      password: ['', Validators.required],
      phone: [''],
    });

  }



  onSubmit() { this.authService.loginStaff(this.email, this.password); }


  registerStaff() {
    console.log(this.staffMember.get('type').value);
    this.registeredStaff = new StaffMember(this.staffMember.value)
    this.authService.registerStaff(this.registeredStaff);
  }
  cancel() {
    this.register = false;
  }


}
