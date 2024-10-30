import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { item } from "../models/item";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environment/environment";

@Injectable({
    providedIn: 'root'
})
export class BoutiqueService {

    constructor(private http: HttpClient) { }

    // Récupérer tous les articles de la boutique
    getAll(): Observable<item[]> {
        return this.http.get<item[]>(`${environment.baseUrl}/shop`, environment.httpOption);
    }

    // Méthode pour effectuerng un achat
  
    buyItem(userId: string | null, objectId: number): Observable<any> {
    // Construit l'URL avec l'ID de l'utilisateur et l'ID de l'objet
    const url = `${environment.baseUrl}/shop/buy/${userId}/${objectId}`;
    console.log('Calling URL:', url); 
    return this.http.post<any>(url, environment.httpOption);
  }
}
