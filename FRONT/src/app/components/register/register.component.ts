import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  name = '';
  email = '';
  password = '';
  errorMessage = '';

  // Injection router dans le constructeur
  constructor(private router: Router, private toast: ToastrService) {}

  onRegister() {
    if (this.username && this.email && this.password) {
      this.toast.success('Inscription réussie ', 'Inscription')
      this.router.navigate(['/login']);  
    } else {
      console.log(this.username);
      console.log(this.password);
      console.log(this.email);
      console.log(this.name);
      this.errorMessage = 'Veuillez remplir tous les champs requis.';
    }
  }
}
