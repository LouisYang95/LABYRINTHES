import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('panel') panel!: any;
  flagMenu = false;
  flagConnecter = false;
  
  constructor(private toast: ToastrService, private rooter: Router) {}

  openMenu(): void {
    if (sessionStorage.getItem("email") != null || sessionStorage.getItem("password") != null)  this.flagConnecter = true;
    else this.flagConnecter = false;
    if (this.flagMenu) this.panel.nativeElement.classList.remove('open');
    else this.panel.nativeElement.classList.add('open');
    this.flagMenu = !this.flagMenu;
  }
  toaster(destination: string): void {
    this.toast.error(`Veuillez vous connecter pour accéder à la page ${destination} !`, "Authentification requise")
  }
  deconnection(): void {
    sessionStorage.clear();
    this.flagConnecter = false;
    this.rooter.navigateByUrl('/');
  }
}
