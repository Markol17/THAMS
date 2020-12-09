import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  type: string = null;
  name: string = null;
  constructor(private auth: AuthenticationService) {
    this.type = this.auth.getRole();
    this.name = this.auth.getName();
  }


  ngOnInit(): void {

  }

  isChargeNurse() {
    if (this.auth.getRole() == "ChargeNurse") {
      return true
    }
    return false
  }

  isDoctor() {

    if (this.auth.getRole() == "Doctor") {
      return true
    }
    return false

  }

  logout() {
    this.auth.logout();
  }

}
