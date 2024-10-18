import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { BoutiqueComponent } from './components/boutique/boutique.component';
import { DecodeurComponent } from './components/decodeur/decodeur.component';
import { CompteComponent } from './components/compte/compte.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },    
  { path: 'register', component: RegisterComponent },
  { component: MainComponent, path: "" },
  { component: BoutiqueComponent, path: "boutique" },
  { component: DecodeurComponent, path: "decodeur" },
  { component: CompteComponent, path: "compte" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
