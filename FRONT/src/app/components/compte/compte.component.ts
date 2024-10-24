import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss'] 
})

export class CompteComponent implements OnInit {
  playerName = 'Abed'; 
  playerPseudo = 'AK47'; 
  playerXP = 50; 
  playerLikes = 50; 
  playerDislikes = 10;
  inventaireSize = 50;

  constructor(private cookieService: CookieService, private root: Router) {}

  ngOnInit(): void {
    if (this.cookieService.get("username") === undefined || sessionStorage.getItem("username") === null) this.root.navigateByUrl("/");
  }
}
