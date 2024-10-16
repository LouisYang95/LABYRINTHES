import { Component } from '@angular/core';
import { Router } from '@angular/router';  

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
  constructor(private router: Router) {}

  ngOnInit() {
    //  si informations sauvegardées dans localStorage
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    const rememberMeFlag = localStorage.getItem('rememberMe');

    // Si informations existent et que "Se souvenir de moi" est activé
    if (rememberMeFlag === 'true' && savedEmail && savedPassword) {
      this.email = savedEmail;
      this.password = savedPassword;
      this.rememberMe = true;
    }
  }

onLogin() {
  // Réinitialiser les messages
  this.errorMessage = '';
  this.successMessage = '';

  // Simuler une connexion réussie
  if (this.email === 'test@example.com' && this.password === 'Password1!') {
    this.successMessage = 'Connexion réussie !';

    // Sauvegarder les informations si "Se souvenir de moi" est coché
    if (this.rememberMe) {
      localStorage.setItem('email', this.email);
      localStorage.setItem('password', this.password);
      localStorage.setItem('rememberMe', 'true');
    } 

    // Naviguer vers une autre page après la connexion (exemple : tableau de bord)
    this.router.navigate(['/']);
  } else {
    this.errorMessage = 'Identifiants invalides. Veuillez réessayer.';
  }
}

hasUpperCase(password: string): boolean {
  return /[A-Z]/.test(password);
}

hasSpecialCharacter(password: string): boolean {
  return /[!@#$%^&*(),.?":{}|<>]/.test(password);
}
}