import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment/environment";
import { Score } from "../models/score";

@Injectable({
    providedIn: 'root'
})
export class TopService {

    constructor(private http: HttpClient) { }

    getGeneral(): Observable<Score[]> {
        return this.http.get<Score[]>(environment.baseUrl+'/top', environment.httpOption);
    }
    getGood(): Observable<Score[]> {
        return this.http.get<Score[]>(environment.baseUrl+'/top/good', environment.httpOption);
    }
    getBad(): Observable<Score[]> {
        return this.http.get<Score[]>(environment.baseUrl+'/top/bad', environment.httpOption);
    }
}