import { HttpClient } from '@angular/common/http';
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
  
}
