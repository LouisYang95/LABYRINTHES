import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.scss'],
})
export class BoutiqueComponent {
  playerCurrency = 1500; 

  // Liste des articles (cadeaux ou pièges)
  currentList: any[] = []; 
  showList = false; 
  listTitle = 'Articles à acheter';
  cart: any[] = []; 
  showCart = false; 

  // Liste des cadeaux et pièges
  gifts = [
    { name: 'Potion de vie', description: 'Restaure 50% de la santé.', image: 'assets/img/p.png', price: 200 },
    { name: 'Clé magique', description: 'Ouvre une porte secrète.', image: 'assets/img/cl.png', price: 300 },
    { name: 'Boussole dorée', description: 'Montre la sortie du labyrinthe.', image: 'assets/img/bou.png', price: 500 },
  ];

  traps = [
    { name: 'Fosse cachée', description: 'Vous fait tomber dans un piège.', image: 'assets/img/foss.png', price: 150 },
    { name: 'Mur invisible', description: 'Bloque votre chemin.', image: 'assets/img/mu.png', price: 250 },
    { name: 'Brouillard', description: 'Réduit la visibilité.', image: 'assets/img/bro.png', price: 350 },
  ];

  constructor(private toast: ToastrService) {
    
    this.currentList = this.gifts;
  }

  showGifts() {
    this.currentList = this.gifts;
    this.listTitle = 'Liste des Cadeaux';
    this.showList = true;
  }

  showTraps() {
    this.currentList = this.traps;
    this.listTitle = 'Liste des Pièges';
    this.showList = true;
  }

  // Acheter un article
  buyItem(item: any): void {
    if (this.playerCurrency >= item.price) {
      this.playerCurrency -= item.price;

      // Ajouter l'article au panier
      this.cart.push(item); 
      this.toast.success(`${item.name} acheté avec succès !`);
    } else {
      this.toast.error("Vous n'avez pas assez de pièces !");
    }
  }

  // Supprimer un article du panier
  removeItem(item: any): void {
    const index = this.cart.indexOf(item);
    if (index > -1) {

      // Supprimer l'article du panier
      this.cart.splice(index, 1); 

      // Restituer le prix de l'article au joueur
      this.playerCurrency += item.price; 
      this.toast.info(`${item.name} retiré du panier.`);
    }
  }

  // Activer ou désactiver l'affichage du panier 
  toggleCartView(): void {
    this.showCart = !this.showCart;
  }
}
