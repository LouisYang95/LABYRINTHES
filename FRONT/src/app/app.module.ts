import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { MatIconModule } from '@angular/material/icon'
import { MainComponent } from './components/main/main.component';
import { FormsModule } from '@angular/forms'; 
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
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
    LoginComponent,
    RegisterComponent,
    BoutiqueComponent,
    DecodeurComponent,
    InventaireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    NgxScannerQrcodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

