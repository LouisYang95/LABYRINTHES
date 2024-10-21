import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('panel') panel!: any;
  flagMenu = false;
  flagConnecter = false;
  
  constructor(private toast: ToastrService, private rooter: Router, private cookieService: CookieService) {}

  ngOnInit(): void {
    if (this.cookieService.get("email") != undefined) this.flagConnecter = true;
  }
  openMenu(): void {
    if (this.cookieService.get("email") != undefined || sessionStorage.getItem("email") != null) this.flagConnecter = true;
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
    this.cookieService.removeAll();
    this.flagConnecter = false;
    this.toast.info("Vous avez été déconnecter.", "Déconnection");
    this.rooter.navigateByUrl('/');
  }
}
