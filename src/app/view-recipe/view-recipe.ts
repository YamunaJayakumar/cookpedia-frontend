import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { Apiservice } from '../services/apiservice';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-view-recipe',
  imports: [Footer,Header,RouterLink],
  templateUrl: './view-recipe.html',
  styleUrl: './view-recipe.css',
})
export class ViewRecipe {
  recipe:any=signal({})
  relatedRecipe:any=signal([])
  api=inject(Apiservice)
  activatedRoute=inject(ActivatedRoute)
  recipeId:string=this.activatedRoute.snapshot.params['id']
  router=inject(Router)
  ngOnInit(){
    this.getRecipe(this.recipeId)
  }

  getRecipe(recipeId:string){
    this.api.viewRecipeAPI(recipeId).subscribe((res:any)=>{
      this.recipe.set(res)
      //call get related recipes
      this.getAllRelatedRecipes(res.cuisine)
      
    })
  }

   getAllRelatedRecipes(cuisine:string){
    this.api.getRelatedRecipeAPI(cuisine).subscribe((res:any)=>{
      if(res.length>1){
        this.relatedRecipe.set(res.filter((item:any)=>item.name != this.recipe().name))
      }else{
        this.relatedRecipe.set([])
      }
      console.log(this.relatedRecipe());
    })
  }
    viewRelatedRecipeDetails(recipeId:string){
    this.router.navigateByUrl(`/recipes/${recipeId}/view`)
    this.getRecipe(recipeId)
  }
  //download recipe
downloadRecipe(){
    this.api.addToDownloadAPI(this.recipeId,{name:this.recipe().name,cuisine:this.recipe().cuisine,image:this.recipe().image}).subscribe({
      next:((res:any)=>{
        console.log(res);        
        this.pdfRecipe()
      }),
      error:(reason:any)=>{
        console.log(reason);
        
      }
    })
  }
  //dowload recipe
  pdfRecipe(){
    let pdf =new jsPDF()
    let titleRow=['Name','Cuisine','Servings','Ingredients','Instructions']
    let bodyData =[this.recipe().name,this.recipe().cuisine,this.recipe().servings,this.recipe().ingredients,this.recipe().instructions]
    autoTable(pdf,{
      head:[titleRow],
      body:[bodyData]
    })
    pdf.save(`${this.recipe().name}.pdf`)
  }

  //saveRecipe
  saveRecipe() {
  this.api
    .addToSaveRecipeAPI(this.recipeId, {
      name: this.recipe().name,
      image: this.recipe().image
    })
    .subscribe({
      next: (res: any) => {
        alert(`${res.name} added to your recipe collection`);
      },
      error: (reason: any) => {
        console.log(reason);
        alert(reason.error);
      }
    });
}
     
    

}


  
 


