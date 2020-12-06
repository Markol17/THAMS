import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }
  type:string = null;

  ngOnInit(): void {
    this.type = this.auth.getRole();
  }

  isChargeNurse(){
    if(this.auth.getRole()=="ChargeNurse"){
      return true
    }
   return false
  }

  logout(){
    this.auth.logout();
  }

}
