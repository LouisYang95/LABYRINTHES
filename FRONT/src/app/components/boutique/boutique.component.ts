import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';
import { item } from 'src/app/core/models/item';
import { BoutiqueService } from 'src/app/core/services/boutique.service';

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.scss']
})
export class BoutiqueComponent implements OnInit, OnDestroy {
  // Monnaie pour les cadeaux
  giftCurrency: number = 1500;
  // Monnaie pour les pièges
  trapCurrency: number = 800;
  // Liste des articles (cadeaux ou pièges)
  currentList: any[] = [];
  currentmonnaie = 0;
  showList = false;
  listTitle = 'Articles à acheter';
  cart: any[] = [];
  showCart = false;
  gifts: item[] = [];
  traps: item[] = [];

  constructor(private toast: ToastrService, private boutiqueService: BoutiqueService, private root: Router, private cookieService: CookieService) {
    this.currentList = this.gifts;
    this.showGifts();
  }

  ngOnInit(): void {
    if (this.cookieService.get("username") === undefined || sessionStorage.getItem("username") === null) this.root.navigateByUrl("/");
    this.boutiqueService.getAll().subscribe(res => {
      res.forEach(element => {
        if (element.type === "good") this.gifts.push(element);
        else this.traps.push(element);
      });
    });
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
  // Acheter un article
  buyItem(item: any): void {
    if (this.currentList === this.gifts) {
      // Si c'est un cadeau, utiliser la monnaie des cadeaux
      if (this.giftCurrency >= item.price) {
        this.giftCurrency -= item.price;
        this.cart.push(item);
        this.toast.success(`${item.name} acheté avec succès !`);
      } else this.toast.error("Vous n'avez pas assez de pièces pour les cadeaux !");
    } else if (this.currentList === this.traps) {
      // Si c'est un piège, utiliser la monnaie des pièges
      if (this.trapCurrency >= item.price) {
        this.trapCurrency -= item.price;
        this.cart.push(item);
        this.toast.success(`${item.name} acheté avec succès !`);
      } else this.toast.error("Vous n'avez pas assez de pièces pour les pièges !");
    }
  }
  // supprimer un article du panier
  removeItem(item: any): void {
    const index = this.cart.indexOf(item);
    if (index > -1) {
      this.cart.splice(index, 1);
      // retour de la monnaie selon le type d'article
      if (this.gifts.includes(item)) this.giftCurrency += item.price;
      else if (this.traps.includes(item)) this.trapCurrency += item.price;
      this.toast.info(`${item.name} retiré du panier.`);
    }
  }
  // Activer ou désactiver l'affichage du panier
  toggleCartView(): void {
    this.showCart = !this.showCart;
  }
  ngOnDestroy(): void {}
}
