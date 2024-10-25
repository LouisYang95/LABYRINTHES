import { Component, OnInit } from '@angular/core';
import { CompteService, Player } from 'src/app/core/services/compte.service'; 

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {
  playerName: string | null = '';
  playerPseudo: string | null = '';
  playerXP: number = 0;
  playerLikes: string | null = "0";
  playerDislikes: string | null = "0";
  errorMessage: string = '';
  giftCurrency: number = 0;

  constructor(private compteService: CompteService) { }

  ngOnInit(): void {
    // Récupération des informations du joueur depuis le stockage de session
    this.playerName = sessionStorage.getItem('username');
    this.playerPseudo = sessionStorage.getItem('username');
    this.playerLikes = sessionStorage.getItem('good_points');
    this.playerDislikes = sessionStorage.getItem('bad_points');

    // Gestion des erreurs lors de la récupération des informations du joueur
    if (!this.playerName || !this.playerPseudo) {
      this.errorMessage = 'Impossible de charger les informations du joueur.';
      console.error('Erreur récupération des données:', this.errorMessage);
    }

}

}
