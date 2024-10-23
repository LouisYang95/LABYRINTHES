import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieOptions, CookieService } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';

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
  cookiesOption: CookieOptions = { };

  // Injecter Router dans le constructeur
  constructor(private router: Router, private toast: ToastrService, private cookieService: CookieService) {
    this.initCookies();
  }

  onLogin() {
    // Réinitialiser les messages
    this.errorMessage = '';

    // Simuler une connexion réussie
    if (this.email === 'test@example.com' && this.password === 'Password1!') {
      this.toast.success("Connection établie avec succès", "Authentification réussi");
      // Sauvegarder les informations si "Se souvenir de moi" est coché
      sessionStorage.setItem('email', this.email);
      sessionStorage.setItem('password', this.password);
      if (this.rememberMe) {
        this.cookieService.put("email", this.email, this.cookiesOption);
        this.cookieService.put("password", this.password, this.cookiesOption);
      } else this.cookieService.removeAll();
      // Naviguer vers une autre page après la connexion (exemple : tableau de bord)
      this.router.navigate(['/']);
    } else this.errorMessage = 'Identifiants invalides. Veuillez réessayer.';
  }
  initCookies(): void {
    let expiry = new Date();
    expiry.setDate(expiry.getDate()+365);
    this.cookiesOption.expires = expiry;
    this.cookiesOption.secure = true;
  }
  hasUpperCase(password: string): boolean {
    return /[A-Z]/.test(password);
  }
  hasSpecialCharacter(password: string): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(password);
  }
}