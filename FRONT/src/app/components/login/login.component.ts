import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieOptions, CookieService } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';
import { authResponse } from 'src/app/core/models/authResponse';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  id: string = ''; 
  username: string = '';
  password: string = '';
  good_points: number  = 0;
  bad_points: number = 0;
  rememberMe: boolean = false;
  errorMessage: string = '';
  cookiesOption: CookieOptions = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService,
    private cookieService: CookieService
  ) { }

  onLogin() {
    this.errorMessage = '';

    // Appel du service d'authentification pour le login
    this.authService.login(this.username, this.password).subscribe((response: authResponse) => {
      if (response && response.message === 'Login successful') {
        this.toast.success("Connexion réussie", "Authentification");
        // Sauvegarder les informations si "Se souvenir de moi" est coché
        sessionStorage.setItem('username', this.username);
        sessionStorage.setItem('id', (response.user.id).toString())
        sessionStorage.setItem('good_points', (response.user.good_points).toString())
        sessionStorage.setItem('bad_points', (response.user.bad_points).toString())
        if (this.rememberMe) {
          this.cookieService.put('username', this.username);
          this.cookieService.put('password', this.password);
        } else this.cookieService.removeAll();
        // Redirection vers la page de tableau de bord
        this.router.navigate(['/']);
      }
    },
      (error: any) => {
        // En cas d'erreur de connexion
        this.errorMessage = 'Connexion échouée. Veuillez vérifier vos identifiants.';
        this.toast.error("Connexion échouée", "Erreur");
        console.error('Erreur de connexion:', error);
      }
    );
  }

  initCookies(): void {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 365);
    this.cookiesOption.expires = expiry;
    this.cookiesOption.secure = true;
  }
}
