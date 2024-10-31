import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { item } from 'src/app/core/models/item';
import { BoutiqueService } from 'src/app/core/services/boutique.service';

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.scss']
})
export class BoutiqueComponent implements OnInit, OnDestroy {
  goodCurrency: number = sessionStorage.getItem('good_points') as unknown as number;
  trapCurrency: number = sessionStorage.getItem('bad_points') as unknown as number;
  currentList: any[] = [];
  currentmonnaie = 0;
  showList = false;
  listTitle = 'Articles à acheter';
  cart: item[] = [];
  showCart = false;
  gifts: item[] = [];
  traps: item[] = [];
  subcribes: Subscription[] = [];
  userId: string | null = sessionStorage.getItem('id');

  constructor(private toast: ToastrService, private boutiqueService: BoutiqueService, private root: Router, private cookieService: CookieService) {
    this.currentList = this.gifts;
    this.showGifts();
  }

  ngOnInit(): void {
    // Charger tous les articles
    if (this.cookieService.get("username") === undefined && sessionStorage.getItem("username") === null) this.root.navigateByUrl("/");
    this.boutiqueService.getAll().subscribe(res => {
      res.forEach(element => {
        if (element.type === "good") this.gifts.push(element);
        else this.traps.push(element);
      });
    }));
  }
  // Afficher la liste des cadeaux
  showGifts() {
    this.currentList = this.gifts;
    this.currentmonnaie = 1;
    this.listTitle = 'Liste des Cadeaux';
    this.showList = true;
  }
  // Afficher la liste des pièges
  showTraps() {
    this.currentList = this.traps;
    this.currentmonnaie = 2;
    this.listTitle = 'Liste des Pièges';
    this.showList = true;
  }
  // Acheter un article avec la requête API
  buyItem(item: item): void {
    const objectId = item.id;

    // Appel à l'API pour effectuer l'achat
    this.boutiqueService.buyItem(this.userId, objectId).subscribe(
      response => {
        // Si c'est un cadeau, utiliser la monnaie des cadeaux
        if (this.currentList === this.gifts) {
          if (this.goodCurrency >= item.price) {
            this.goodCurrency -= item.price;
            this.cart.push(item);
            this.toast.success(`${item.name} acheté avec succès !`);
          } else {
            this.toast.error("Vous n'avez pas assez de pièces pour les cadeaux !");
          }
        }
        // Si c'est un piège, utiliser la monnaie des pièges
        else if (this.currentList === this.traps) {
          if (this.trapCurrency >= item.price) {
            this.trapCurrency -= item.price;
            this.cart.push(item);
            this.toast.success(`${item.name} acheté avec succès !`);
          } else {
            this.toast.error("Vous n'avez pas assez de pièces pour les pièges !");
          }
        }
      },
      error => {
        // Gestion des erreurs
        this.toast.error("Erreur lors de l'achat de l'article.");
        console.error("Erreur d'achat:", error);

      }
    }, error => {
      // Gestion des erreurs
      this.toast.error("Erreur lors de l'achat de l'article.");
      console.error("Erreur d'achat:", error);
    }));
  }
  // Supprimer un article du panier
  removeItem(item: item): void {
    const index = this.cart.indexOf(item);
    if (index > -1) {
      this.cart.splice(index, 1);
      if (this.gifts.includes(item)) this.goodCurrency += item.price;
      else if (this.traps.includes(item)) this.trapCurrency += item.price;
      this.toast.info(`${item.name} retiré du panier.`);
    }
  }
  // Activer ou désactiver l'affichage du panier
  toggleCartView(): void {
    this.showCart = !this.showCart;
  }
  ngOnDestroy(): void {
    this.subcribes.forEach(element => {
      element.unsubscribe();
    });
  }
}
