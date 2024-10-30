import { Component } from '@angular/core';

// Définition de l'interface Labyrinthe
interface Labyrinthe {
  id: number;
  name: string;
  likes: number;
  dislikes: number;
}

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent {
  playerName = 'Abed'; 
  playerPseudo = 'AK47'; 
  playerXP = 50; 
  inventaireSize = 50;

  // Définir le labyrinthe actuel
  currentLabyrinthe: Labyrinthe = {
    id: 1,
    name: 'Premier Labyrinthe',
    likes: 100,       
    dislikes: 20     
  };
}
