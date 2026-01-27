import { Component, inject, Inject } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apiservice } from '../services/apiservice';

@Component({
  selector: 'app-contact',
  imports: [Header,Footer,ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  testimonialForm:FormGroup;
  fb=inject(FormBuilder)
  router=inject(Router)
  api=inject(Apiservice)
  constructor(){
    this.testimonialForm= this.fb.group({
      name:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      email:['',[Validators.required,Validators.email]],
      message:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]

    })
    } 

    testimony(){
    if(this.testimonialForm.valid){
      const name = this.testimonialForm.value.name
      const email=this.testimonialForm.value.email
      const message =this.testimonialForm.value.message
      
      this.api.addFeedBackAPI({name,email,message}).subscribe({
        next:(res:any)=>{
          alert("submitted successfully")
          this.testimonialForm.reset()
          this.router.navigateByUrl('/')

        },
        error:(reason:any)=>{
          alert(reason.error)
          this.testimonialForm.reset()
         

        }
      })
    }
    else{
      alert("invalid inputs")
    }
  }




}
