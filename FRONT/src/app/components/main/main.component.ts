import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, OnDestroy {

  constructor() {}

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const value = scrollHeight > viewportHeight ? window.pageYOffset / (scrollHeight - viewportHeight) : 0;
      document.body.style.setProperty('--scroll', value.toString());
    });
  }
  ngOnDestroy(): void {}
}
