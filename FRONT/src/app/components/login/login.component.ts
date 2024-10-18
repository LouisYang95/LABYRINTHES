import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  // Injecter Router dans le constructeur
  constructor(private router: Router, private cookieService: CookieService) { }

  onLogin() {
    // Réinitialiser les messages
    this.errorMessage = '';
    this.successMessage = '';

    // Simuler une connexion réussie
    if (this.email === 'test@example.com' && this.password === 'Password1!') {
      this.successMessage = 'Connexion réussie !';
      // Sauvegarder les informations si "Se souvenir de moi" est coché
      sessionStorage.setItem('email', this.email);
      sessionStorage.setItem('password', this.password);
      if (this.rememberMe) {
        this.cookieService.put("email", this.email);
        this.cookieService.put("password", this.password);
      } else this.cookieService.removeAll();
      // Naviguer vers une autre page après la connexion (exemple : tableau de bord)
      this.router.navigate(['/']);
    } else this.errorMessage = 'Identifiants invalides. Veuillez réessayer.';
  }

  hasUpperCase(password: string): boolean {
    return /[A-Z]/.test(password);
  }

  hasSpecialCharacter(password: string): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }
}