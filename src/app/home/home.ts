import { Component, inject, signal } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { RouterLink } from '@angular/router';
import { Apiservice } from '../services/apiservice';


@Component({
  selector: 'app-home',
  imports: [Header,Footer,RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  allrecipes:any =signal([])
  api = inject(Apiservice)

  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      // console.log(res);
      //asign-set method of signal
      this.allrecipes.set(res.slice(0,6))
      console.log(this.allrecipes());
      
      
    })
  }

}
