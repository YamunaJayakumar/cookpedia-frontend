import { Component, inject } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

import { Router } from '@angular/router';
import { Apiservice } from '../services/apiservice';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [Header,Footer,FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  name:string=''
  email:string=''
  message:string=''
  api=inject(Apiservice)
  addFeedback(){
    if(this.name && this.email && this.message){
      this.api.addFeedBackAPI({name:this.name ,email:this.email,message:this.message}).subscribe((res:any)=>{
        this.name=""
        this.email=""
        this.message=""
        alert("thankyou for your feedback")
      })
      
    }
    else{
      alert("please fill the form completely")
    }
  }
 
   




}
