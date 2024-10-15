import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @ViewChild('panel') panel!: any;
  flagMenu = false;
  
  constructor() {}

  openMenu(): void {
    if (this.flagMenu) this.panel.nativeElement.classList.remove('open');
    else this.panel.nativeElement.classList.add('open');
    this.flagMenu = !this.flagMenu;
  }
}
