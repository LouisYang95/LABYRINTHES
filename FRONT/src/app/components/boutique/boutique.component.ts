import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.scss'],
})
export class BoutiqueComponent {
  // Monnaie pour les cadeaux
  giftCurrency: number = 1500; 

  // Monnaie pour les pièges
  trapCurrency: number = 800;  

  // Liste des articles (cadeaux ou pièges)
  currentList: any[] = [];
  showList = false;
  listTitle = 'Articles à acheter';
  cart: any[] = [];
  showCart = false;

  
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

  // Afficher la liste des cadeaux
  showGifts() {
    this.currentList = this.gifts;
    this.listTitle = 'Liste des Cadeaux';
    this.showList = true;
  }

  // Afficher la liste des pièges
  showTraps() {
    this.currentList = this.traps;
    this.listTitle = 'Liste des Pièges';
    this.showList = true;
  }

  // Acheter un article
  buyItem(item: any): void {
    if (this.currentList === this.gifts) {

      // Si c'est un cadeau, utiliser la monnaie des cadeaux
      if (this.giftCurrency >= item.price) {
        this.giftCurrency -= item.price;
        this.cart.push(item); 
        this.toast.success(`${item.name} acheté avec succès !`);
      } else {
        this.toast.error("Vous n'avez pas assez de pièces pour les cadeaux !");
      }
    } else if (this.currentList === this.traps) {

      // Si c'est un piège, utiliser la monnaie des pièges
      if (this.trapCurrency >= item.price) {
        this.trapCurrency -= item.price;
        this.cart.push(item); 
        this.toast.success(`${item.name} acheté avec succès !`);
      } else {
        this.toast.error("Vous n'avez pas assez de pièces pour les pièges !");
      }
    }
  }

  // supprimer un article du panier
  removeItem(item: any): void {
    const index = this.cart.indexOf(item);
    if (index > -1) {
      this.cart.splice(index, 1); 

      // retour de la monnaie selon le type d'article
      if (this.gifts.includes(item)) {
        this.giftCurrency += item.price; 
      } else if (this.traps.includes(item)) {
        this.trapCurrency += item.price; 
      }

      this.toast.info(`${item.name} retiré du panier.`);
    }
  }

  // Activer ou désactiver l'affichage du panier
  toggleCartView(): void {
    this.showCart = !this.showCart;
  }
}
