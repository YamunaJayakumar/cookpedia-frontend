import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Apiservice {

  server_url='http://localhost:3000'
  http=inject(HttpClient)
  
  //api function
  //1 get all recipes:called by home and recipes component
  getAllRecipeAPI(){
    return this.http.get(`${this.server_url}/recipes`)
  }
  //register api
  registerAPI(user:any){
    return this.http.post(`${this.server_url}/register`,user)
  }
  //login api
  loginAPI(user:any){
    return this.http.post(`${this.server_url}/login`,user)
  }
  //1 view recipe:view compoent when the page load
  viewRecipeAPI(recipeId:string){
    return this.http.get(`${this.server_url}/recipes/${recipeId}`)
  }
  //related-recipes?cuisine=Italian
  getRelatedRecipeAPI(cuisine:string){
    return this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`)
  }

   appendToken(){
    const token = sessionStorage.getItem("token")
    let headers = new HttpHeaders()
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  ///downloads/:id api 
  addToDownloadAPI(recipeId:string,reqBody:any){
    return this.http.post(`${this.server_url}/downloads/${recipeId}`,reqBody,this.appendToken())
  }

  //post-called by view componet when save btn clicked
  addToSaveRecipeAPI(recipeId:string,reqBody:any){
        return this.http.post(`${this.server_url}/recipes/${recipeId}/save`,reqBody,this.appendToken())

  }
  //get request from save recipe component when userCollection page load
  GetUserSaveRecipeAPI(){
        return this.http.get(`${this.server_url}/recipe-collection`,this.appendToken())

  }
  //delete from save recipe when delete btn clciked
  removeUserSaveRecipeAPI(recipeId:string){
        return this.http.delete(`${this.server_url}/recipe-collection/${recipeId}`,this.appendToken())

  }
  //post by contact component when submit btn clciked
  addFeedBackAPI(reqBody:any){
    return this.http.post(`${this.server_url}/feedback`,reqBody)
  }
}
