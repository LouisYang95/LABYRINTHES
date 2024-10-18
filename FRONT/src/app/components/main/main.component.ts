import { Component, OnDestroy, OnInit } from '@angular/core';



interface Winner {
  name: string;
  time: string; 
  score: number;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  // compte à rebours 5 minutes
  minutes: number = 5; 
  seconds: number = 0;
  countdownInterval: any;


   // Liste des winners
   winners: Winner[] = [
    { name: 'Abed', time: '02:30', score: 89 },
    { name: 'Ad', time: '03:15', score: 90 },
    { name: 'Thomas', time: '04:05', score: 85 },
    { name: 'Théo', time: '04:05', score: 80},
    { name: 'Louis', time: '04:05', score: 70 }
  ];

  constructor() {}

  ngOnInit(): void {
    // Initialisation du compte à rebours
    this.startCountdown();

    // Gestion de l'événement de défilement
    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const value = scrollHeight > viewportHeight ? window.pageYOffset / (scrollHeight - viewportHeight) : 0;
      document.body.style.setProperty('--scroll', value.toString());
    });
  }

  // Démarre le compte à rebours
  startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      if (this.seconds === 0) {
        if (this.minutes === 0) {

          // Réinitialiser si le compte est à zéro
          this.resetCountdown(); 
        } else {
          this.minutes--;
          this.seconds = 59;
        }
      } else {
        this.seconds--;
      }
    }, 1000);
  }

  // Réinitialise le compte à rebours
  resetCountdown(): void {
    clearInterval(this.countdownInterval); 

    // Remet à 5 minutes
    this.minutes = 5; 
    this.seconds = 0;
    this.startCountdown(); 
  }

  ngOnDestroy(): void {
    clearInterval(this.countdownInterval); 

    // Supprime l'événement de défilement
    window.removeEventListener('scroll', () => {}); 
  }
}

