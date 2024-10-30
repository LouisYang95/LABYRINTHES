import { Component, OnInit } from '@angular/core';
import { CompteService, Player } from 'src/app/core/services/compte.service'; 

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {
  playerName: string | null = '';
  playerPseudo: string | null= '';
  playerXP = 0;
  playerLikes: string | null= "0";
  playerDislikes: string | null= "0";
  errorMessage = '';
  giftCurrency = 0;

  constructor(private compteService: CompteService) { }

  ngOnInit(): void {
    // Récupérer les données du joueur avec id
        this.playerName = sessionStorage.getItem('username');
        this.playerPseudo = sessionStorage.getItem('username');
        this.playerLikes = sessionStorage.getItem('good_points');
        this.playerDislikes = sessionStorage.getItem('bad_points');
      
      (error: any) => {
        console.error('Erreur récupération des données:', error);
        this.errorMessage = 'Impossible de charger les informations du joueur.';
      }
    
  }
}
