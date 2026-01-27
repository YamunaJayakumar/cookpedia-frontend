import { Component, inject, signal } from '@angular/core';
import { Apiservice } from '../services/apiservice';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-collection',
  imports: [Header,Footer,RouterLink],
  templateUrl: './user-collection.html',
  styleUrl: './user-collection.css',
})
export class UserCollection {
  allRecipes:any=signal([])
  api=inject(Apiservice)
  
  ngOnInit(){
    this.getUserCollection()
  }

  getUserCollection(){
    this.api.GetUserSaveRecipeAPI().subscribe((res:any)=>{
      console.log(res)
      this.allRecipes.set(res)

    })
  }
  
  deleteRecipe(id:string){
    this.api.removeUserSaveRecipeAPI(id).subscribe((res:any)=>{
      this.getUserCollection()
    })
  }

}
