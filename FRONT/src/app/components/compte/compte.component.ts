import { Component, OnInit } from '@angular/core';
import { CompteService } from 'src/app/core/services/compte.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {
  playerId: string | null = '';
  playerName: string | null = '';
  playerPseudo: string | null= '';
  playerXP: number = 0;
  selectedItem: any = null;
  playerLikes: string | null= "0";
  playerDislikes: string | null= "0";
  errorMessage: string = '';
  giftCurrency: number = 0;
  playerInventory: any[] = [];
  subscription: Subscription[] = [];
  showSuccessAlert: boolean = false;
  showErrorAlert: boolean = false;

  constructor(private compteService: CompteService) { }

  ngOnInit(): void {
    this.playerId = sessionStorage.getItem('id');
    this.playerName = sessionStorage.getItem('username');
    this.playerPseudo = sessionStorage.getItem('username');
    this.playerLikes = sessionStorage.getItem('good_points');
    this.playerDislikes = sessionStorage.getItem('bad_points');

    if (this.playerId) {
      this.compteService.getInventory(parseInt(this.playerId)).subscribe(
        (data: any) => {
          if (data && data.inventory) {
            const inventoryMap: { [key: number]: any } = {};

            data.inventory.forEach((item: any) => {
              const objectId = item.object_id;
              if (inventoryMap[objectId]) {
                inventoryMap[objectId].quantity += 1;
              } else {
                inventoryMap[objectId] = {
                  id: item.object_id,
                  name: item.Object.name,
                  description: item.Object.description,
                  image: `${item.Object.image}`,
                  quantity: 1
                };
              }
            });

            this.playerInventory = Object.values(inventoryMap);
          } else {
            console.error("L'inventaire reçu n'est pas valide:", data);
          }
        },
        (error: any) => {
          console.error("Erreur récupération de l'inventaire:", error);
          this.errorMessage = "Impossible de charger l'inventaire du joueur.";
        }
      );

      this.getSelectedItem(parseInt(this.playerId));
    }
  }

  saveSelectedItem(object_id: number): void {
    console.log(object_id, typeof(object_id));
    this.compteService.saveSelectedItem({ user_id: this.playerId, object_id: object_id.toString() }).subscribe(
      () => {
        this.showSuccessAlert = true;
        this.showErrorAlert = false;
        this.hideAlertsAfterDelay();
      },
      (error: any) => {
        console.log(error);
        console.error("Erreur lors de la sauvegarde de l'inventaire:", error.message);
        this.showSuccessAlert = false;
        this.showErrorAlert = true;
        this.hideAlertsAfterDelay();
      }
    );
  }
  hideAlertsAfterDelay(): void {
    setTimeout(() => {
      this.showSuccessAlert = false;
      this.showErrorAlert = false;
    }, 3000);
  }

  getSelectedItem(playerId: any): void {
    this.compteService.getSelectedItem(playerId).subscribe(
      (data: any) => {
        console.log(data);
        if (data && data.selectedItem.Inventory.Object) {
          this.selectedItem = data.selectedItem.Inventory.Object;
        } else {
          console.error("L'objet reçu n'est pas valide:", data);
        }
      },
      (error: any) => {
        console.error("Erreur lors de la récupération de l'objet sélectionné:", error);
        this.errorMessage = "Impossible de charger l'objet sélectionné.";
      }
    );
  }
}
