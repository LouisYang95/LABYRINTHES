import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Score } from 'src/app/core/models/score';
import { TopService } from 'src/app/core/services/top.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  // compte à rebours 5 minutes
  hours: number = 0;
  minutes: number = 5;
  seconds: number = 0;
  countdownInterval: any;
  targetTime: Date;
  // Liste des winners
  generalScore: Score[] = [];
  goodScore: Score[] = [];
  badScore: Score[] = [];
  subscription: Subscription[] = [];

  constructor(private topService: TopService) {
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
    this.getScores();
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
      this.hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      this.minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
      this.seconds = Math.floor((timeDifference / 1000) % 60);
    } else {
      this.resetCountdown();
    }
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
  getScores(): void {
    this.subscription.push(this.topService.getGeneral().subscribe(res => { this.generalScore = res; }));
    this.subscription.push(this.topService.getGood().subscribe(res => { this.goodScore = res; }));
    this.subscription.push(this.topService.getBad().subscribe(res => { this.badScore = res; }));
  }
  ngOnDestroy(): void {
    this.subscription.forEach(element => {
      element.unsubscribe();
    });
    clearInterval(this.countdownInterval);
    // Supprime l'événement de défilement
    window.removeEventListener('scroll', () => { });
  }
}

