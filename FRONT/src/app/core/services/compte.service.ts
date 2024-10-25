import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environment/environment';

export interface Player {
  id: number;
  username: string;
  pseudo: string;
  xp: number;
  likes: number;
  dislikes: number;
  giftCurrency?: number; 
}

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les infos du joueur
  getPlayerData(playerId: number): Observable<Player> {
    return this.http.get<Player>(`${environment.baseUrl}/api/player/${playerId}`, environment.httpOption)
      .pipe(
        catchError(error => {
          console.error('Erreur de récupération des données du joueur :', error);
          return throwError(() => error);
        })
      );
  }

    // Méthode pour récupérer la monnaie totale pour les cadeaux
    getTotalGiftCurrency(playerId: number): Observable<number> {
      return this.http.get<number>(`${environment.baseUrl}/player/${playerId}/giftCurrency`, environment.httpOption);
    }
  
  
}
