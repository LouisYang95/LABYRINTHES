import { Component } from '@angular/core';

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.scss']
})
export class BoutiqueComponent {

  // Liste des cadeaux (objets de type cadeau)
  gifts = [
    { name: 'Potion de vie', description: 'Restaure 50% de la santé.' },
    { name: 'Clé magique', description: 'Ouvre une porte secrète dans le labyrinthe.' },
    { name: 'Boussole dorée', description: 'Montre la sortie du labyrinthe.' }
  ];

  // Liste des pièges (objets de type piège)
  traps = [
    { name: 'Fosse cachée', description: 'Vous fait tomber dans un piège et perdre du temps.' },
    { name: 'Mur invisible', description: 'Bloque votre chemin pendant un certain temps.' },
    { name: 'Brouillard', description: 'Réduit la visibilité dans le labyrinthe.' }
  ];

  // Propriétés pour la gestion de la vue
  currentList: any[] = [];  // Liste actuelle (cadeaux ou pièges)
  listTitle: string = '';      // Titre de la liste (cadeaux ou pièges)
  showList: boolean = false;   // Pour afficher ou non la liste

  // Fonction pour afficher les cadeaux
  showGifts() {
    this.currentList = this.gifts;
    this.listTitle = 'Liste des Cadeaux';
    this.showList = true;
  }

  // Fonction pour afficher les pièges
  showTraps() {
    this.currentList = this.traps;
    this.listTitle = 'Liste des Pièges';
    this.showList = true;
  }
}
