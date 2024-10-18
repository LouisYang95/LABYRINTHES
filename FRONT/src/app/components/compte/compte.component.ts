import { Component } from '@angular/core';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss'] 
})

export class CompteComponent {
  playerName = 'Abed'; 
  playerPseudo = 'AK47'; 
  playerXP = 50; 
  playerLikes = 50; 
  playerDislikes = 10;
  inventaireSize = 50;

  constructor() {}

}
