import { Component, OnDestroy, OnInit } from '@angular/core';
import { Winner } from 'src/app/core/models/winner';

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
  targetTime: Date;
  // Liste des winners
  winners: Winner[] = [
    { name: 'Abed', time: '02:30', score: 89 },
    { name: 'Ad', time: '03:15', score: 90 },
    { name: 'Thomas', time: '04:05', score: 85 },
    { name: 'Théo', time: '04:05', score: 80 },
    { name: 'Louis', time: '04:05', score: 70 },
    { name: 'Flo', time: '04:05', score: 75 }
  ];

  constructor() {
    this.targetTime = this.getMidnight();
  }

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
  // heure de minuit au jours suivant
  getMidnight(): Date {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    return midnight;
  }
  // temps restant jusqu'à minuit
  calculateTimeLeft(): void {
    const now = new Date().getTime();
    const timeDifference = this.targetTime.getTime() - now;
    if (timeDifference > 0) {
      // Convertion
      this.minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      this.seconds = Math.floor((timeDifference / 1000) % 60);
    } else this.resetCountdown();
    // Si le temps est écoulé, réinitialition du labyrinthe
  }
  // Démarre le compte à rebours
  startCountdown(): void {
    this.calculateTimeLeft();
    this.countdownInterval = setInterval(() => {
      this.calculateTimeLeft();
    }, 1000);
  }
  // Réinitialition du compte à rebours à minuit du lendemain 
  resetCountdown(): void {
    clearInterval(this.countdownInterval);
    this.targetTime = this.getMidnight();

    // Redémarage du compte à rebours
    this.startCountdown();
  }
  ngOnDestroy(): void {
    clearInterval(this.countdownInterval);
    // Supprime l'événement de défilement
    window.removeEventListener('scroll', () => { });
  }
}

