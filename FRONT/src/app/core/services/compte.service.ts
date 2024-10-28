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

    getInventory(playerId: number): Observable<any> {
      return this.http.get<any>(`${environment.baseUrl}/user/${playerId}/inventory`, environment.httpOption);
    }

    getSelectedItem(playerId: string | null): Observable<any> {
      return this.http.get<any>(`${environment.baseUrl}/selected_item/${playerId}`, environment.httpOption);
    }

    saveSelectedItem(body: { user_id: string | null; object_id: any }) {
    console.log(body);
      return this.http.post(`${environment.baseUrl}/selected_item/save`, { user_id: body.user_id, object_id: body.object_id }, environment.httpOption);
    }
}
