import { Component, inject } from '@angular/core';
import { Footer } from '../footer/footer';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Header } from '../header/header';
import { Router } from '@angular/router';
import { Apiservice } from '../services/apiservice';

@Component({
  selector: 'app-login',
  imports: [Footer,ReactiveFormsModule,Header],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm:FormGroup
  fb=inject(FormBuilder)
  api=inject(Apiservice)
  router=inject(Router)
  // toaster = inject(toastService)

  constructor(){
    this.loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
    })
  }
  //login
  login(){
    if(this.loginForm.valid){
      const email=this.loginForm.value.email
      const password =this.loginForm.value.password
      this.api.loginAPI({email,password}).subscribe({
        next:(res:any)=>{
          sessionStorage.setItem("token",res.token)
          sessionStorage.setItem("user",JSON.stringify(res.user))
          alert("user login successful")
          this.loginForm.reset()
          setTimeout(()=>{
             this.router.navigateByUrl('/')
          },2000)
        },error:(reson:any)=>{
          alert(reson.error)
        }
      })
      
    }
    else{
      //this.toaster.info("invalid input... please fill the form completely")
      alert("invalid input... please fill the form completely")
    }
  }
}
