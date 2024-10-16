import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { combineLatest } from 'rxjs';
import { MainComponent } from './components/main/main.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },    
  { path: 'register', component: RegisterComponent },

  { path: '', component: MainComponent },

  

   // redirection par défaut
 // { path: '', redirectTo: '/login', pathMatch: 'full' }, 

  // Pour toute autre route inconnue, --> vers /login
  { path: '**', redirectTo: '/login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
