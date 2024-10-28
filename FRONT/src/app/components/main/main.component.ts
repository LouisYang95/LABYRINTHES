import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Score } from 'src/app/core/models/score';
import { TopService } from 'src/app/core/services/top.service';
import { WebSocketService } from 'src/app/core/services/websocket.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  hours: number = 0;
  minutes: number = 5;
  seconds: number = 0;
  countdownInterval: any;
  targetTime: Date;
  generalScore: Score[] = [];
  goodScore: Score[] = [];
  badScore: Score[] = [];
  subscription: Subscription[] = [];
  public websocketSubscription: Subscription | undefined;

  constructor(private topService: TopService, private websocketService: WebSocketService) {
    this.targetTime = this.getMidnight();
  }

  ngOnInit(): void {
    // Initialize countdown
    this.startCountdown();
    // Manage scrolling event
    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const value = scrollHeight > viewportHeight ? window.pageYOffset / (scrollHeight - viewportHeight) : 0;
      document.body.style.setProperty('--scroll', value.toString());
    });
    this.getScores();

    this.websocketSubscription = this.websocketService.getMessages().subscribe((message: any) => {
      switch (message.eventType) {
        case 'generalTop':
          this.generalScore = message.data;
          break;
        case 'goodPointsTop':
          this.goodScore = message.data;
          break;
        case 'badPointsTop':
          this.badScore = message.data;
          break;
        default:
          console.warn('Type d’événement inconnu reçu via WebSocket:', message.eventType);
      }
    });
  }
  // Get midnight tomorrow
  getMidnight(): Date {
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    return midnight;
  }
  // Calculate the time left until midnight
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

  // Start countdown
  startCountdown(): void {
    this.calculateTimeLeft();
    this.countdownInterval = setInterval(() => {
      this.calculateTimeLeft();
    }, 1000);
  }
  // Reset countdown to midnight tomorrow
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
    // Remove scrolling event
    window.removeEventListener('scroll', () => { });
  }
}

