import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Recipes } from './recipes/recipes';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Login } from './login/login';
import { Register } from './register/register';
import { UserCollection } from './user-collection/user-collection';
import { UserProfile } from './user-profile/user-profile';
import { ViewRecipe } from './view-recipe/view-recipe';
import { Pnf } from './pnf/pnf';

export const routes: Routes = [
    //home
    {
        path:'',component:Home,title:'Home'
    },
    //recipes
    {
        path:'recipes',component:Recipes,title:'All Recipes'

    },
    {
        path:"about",component:About,title:'About'
    },
    {
        path:'contact',component:Contact,title:'Contact'
    },
    {
        path:'login',component:Login,title:"login"
    },{
        path:'register',component:Register,title:'Register'
    }
    ,{
        path:'user/collection',component:UserCollection,title:'collections'
    }
    ,{
        path:'user/profile',component:UserProfile,title:'Profile'
    },
    {
        path:'recipes/:id/view',component:ViewRecipe,title:'Profile'
    },
     {
        path:'recipes/:id/view',component:ViewRecipe,title:'Recipe'
    },
     {
        path:'**',component:Pnf,title:'Page Not Found'
    }

];
