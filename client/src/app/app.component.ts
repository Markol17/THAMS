import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'thams';

  header:boolean=false;
  constructor(private router: Router, private auth:AuthenticationService){
      router.events.forEach((event)=>{
        if(event instanceof NavigationStart){
          if(event['url']=='/app-loginpage' || !this.auth.logStatus()){
            this.header=false;
          }
          else{
            this.header=true;
          }
        }
      })
  }
}
