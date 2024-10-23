import { HttpHeaders } from "@angular/common/http";

export const environment = {
    baseUrl: "https://labyrinthes-production-2e07.up.railway.app",
    httpOption: { headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }) }
}