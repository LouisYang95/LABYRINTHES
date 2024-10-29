import { HttpHeaders } from "@angular/common/http";

export const environment = {
    baseUrl: "https://labyrinthes-production-2e07.up.railway.app",
    wsUrl: "wss://labyrinthes-production-2e07.up.railway.app:3100",
    httpOption: { headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*' }) }
}
