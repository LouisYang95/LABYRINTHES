import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { MatIconModule } from '@angular/material/icon'
import { MainComponent } from './components/main/main.component';
import { BoutiqueComponent } from './components/boutique/boutique.component';
import { DecodeurComponent } from './components/decodeur/decodeur.component';
import { InventaireComponent } from './components/inventaire/inventaire.component';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';

LOAD_WASM().subscribe();

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    BoutiqueComponent,
    DecodeurComponent,
    InventaireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    NgxScannerQrcodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
