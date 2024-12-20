import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { MatIconModule } from '@angular/material/icon'
import { MainComponent } from './components/main/main.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BoutiqueComponent } from './components/boutique/boutique.component';
import { DecodeurComponent } from './components/decodeur/decodeur.component';
import { CompteComponent } from './components/compte/compte.component';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieModule } from 'ngx-cookie';
import { MatSidenavModule } from '@angular/material/sidenav';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {WebSocketService} from './core/services/websocket.service';


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
    CompteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    NgxScannerQrcodeModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CookieModule.withOptions(),
    MatSidenavModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi()), WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }

