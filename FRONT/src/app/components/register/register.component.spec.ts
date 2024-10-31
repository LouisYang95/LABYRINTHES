import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  onRegister() {
    // Logique d'inscription ici
    if (this.name && this.email && this.password) {
      // Supposons que l'inscription réussisse
      this.successMessage = 'Inscription réussie !';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs requis.';
      this.successMessage = '';
    }
  }
}
