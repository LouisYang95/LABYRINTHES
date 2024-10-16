import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { BoutiqueComponent } from './components/boutique/boutique.component';
import { DecodeurComponent } from './components/decodeur/decodeur.component';
import { InventaireComponent } from './components/inventaire/inventaire.component';

const routes: Routes = [
  { component: MainComponent, path: "" },
  { component: BoutiqueComponent, path: "boutique" },
  { component: DecodeurComponent, path: "decodeur" },
  { component: InventaireComponent, path: "inventaire" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
