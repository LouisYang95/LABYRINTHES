import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {environment} from "../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket;
  private subject = new Subject<any>();

  constructor() {
    // this.socket = new WebSocket('ws://localhost:3100');
    this.socket = new WebSocket(environment.wsUrl);

    this.socket.onmessage = async (event) => {
      try {
        const dataText = event.data instanceof Blob ? await event.data.text() : event.data;

        if (dataText) {
          const data = JSON.parse(dataText);
          this.subject.next(data);
        } else {
          console.warn('Message WebSocket vide ou incomplet reçu.');
        }
      } catch (error) {
        console.error('Erreur lors du traitement du message WebSocket:', error);
      }
    };

    // Gérer les erreurs de connexion
    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  // Renvoie un observable pour les messages WebSocket
  getMessages(): Observable<any> {
    return this.subject.asObservable();
  }
}
