import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('panel') panel!: any;
  flagMenu = false;
  
  // Variable pour suivre l'état de connexion
  isLoggedIn = false;

  constructor(private router: Router) {}

  openMenu(): void {
    if (this.flagMenu) {
      this.panel.nativeElement.classList.remove('open');
    } else {
      this.panel.nativeElement.classList.add('open');
    }
    this.flagMenu = !this.flagMenu;
  }

  // Méthode pour gérer la déconnexion
  logout(): void {
    this.isLoggedIn = false; // Change l'état à déconnecté
    console.log('Utilisateur déconnecté');
    this.router.navigate(['/']); // Redirige vers l'accueil après déconnexion
  }

  // Simuler une connexion (peut être lié à un service d'authentification)
  login(): void {
    this.isLoggedIn = true; // Change l'état à connecté
  }
}
