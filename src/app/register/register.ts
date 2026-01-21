import { Component, inject } from '@angular/core';
import { Footer } from '../footer/footer';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Apiservice } from '../services/apiservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [Footer,ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerForms:FormGroup
  fb= inject(FormBuilder)
  api=inject(Apiservice)
  router=inject(Router)


  constructor(){
    this.registerForms = this.fb.group({
      username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]

    })
  }

  register(){
    if(this.registerForms.valid){
      const username = this.registerForms.value.username
      const email=this.registerForms.value.email
      const password =this.registerForms.value.password

      this.api.registerAPI({username,email,password}).subscribe({
        next:(res:any)=>{
          alert("user registration successful")
          this.registerForms.reset()
          this.router.navigateByUrl('/login')

        },
        error:(reason:any)=>{
          alert(reason.error)
          this.registerForms.reset()
          this.router.navigateByUrl("/login")

        }
      })
    }
    else{
      alert("invalid inputs")
    }
  }

}
