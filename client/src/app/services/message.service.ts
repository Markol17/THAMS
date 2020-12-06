import { NgIf } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomMessageService {

  error:string=null;
  success:string=null;
  constructor() {}

  setError(message:string):void{
    this.error=message;
  }

  setSuccess(message:string):void{
    this.success=message;
  }

  clearError():void{
    this.error=null
  }

  clearSuccess():void{
    this.success=null;
  }


}
