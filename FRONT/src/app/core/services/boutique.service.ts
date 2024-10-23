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

    getAll(): Observable<item[]> {
        return this.http.get<item[]>(environment.baseUrl+'/shop', environment.httpOption);
    }
}