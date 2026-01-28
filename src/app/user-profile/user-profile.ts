import { Component, inject, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { FormsModule } from '@angular/forms';
import { Apiservice } from '../services/apiservice';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-user-profile',
  imports: [Header, Footer, FormsModule, RouterLink],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile {
  api=inject(Apiservice)
  downloadList:any=signal([])
  username:string=''
  userImage:string="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkAJEkJQ1WumU0hXNpXdgBt9NUKc0QDVIiaw&s"

  ngOnInit(){
    if(sessionStorage.getItem("user")){
      const user= JSON.parse(sessionStorage.getItem("user")|| " ")
      this.username=user.username

    }
    this.getDownloadList()
  }


  getDownloadList(){
   this.api.GetUserDownloadRecipeListAPI().subscribe((res:any)=>{
    this.downloadList.set(res)
    console.log(this.downloadList());
    
   })
}
}

