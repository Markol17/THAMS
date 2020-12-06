import { Component, DoCheck, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustomMessageService } from '../services/message.service';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, DoCheck {



  constructor(private messageService: MessageService, private customMessageService: CustomMessageService) {

   }

  ngOnInit(): void {}

  ngDoCheck(){
    if(this.customMessageService.error!=null){
      this.showError(this.customMessageService.error);
    }
    if(this.customMessageService.success!=null){
      this.showSuccess(this.customMessageService.success);
    }
  }

  showSuccess(message:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
    this.customMessageService.clearSuccess();
  }

  showError(messsage:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: messsage });
    this.customMessageService.clearError();
  }


}
