import { Component } from '@angular/core';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss'] 
})

export class CompteComponent {

  playerName: string = 'Abed'; 
  playerPseudo: string = 'AK47'; 
  playerXP: number = 50; 
  playerLikes: number = 50; 
  playerDislikes: number = 10;

  constructor() {}

}
