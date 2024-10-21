import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  // Injection router dans le constructeur
  constructor(private router: Router) {}

  onRegister() {
    if (this.username && this.name && this.email && this.password) {
      this.successMessage = 'Inscription réussie !';
      this.errorMessage = '';
      this.router.navigate(['/login']);  
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs requis.';
      this.successMessage = '';
    }
  }
}
