import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss'],
})
export class AcceuilComponent implements OnInit {
  isLoading: boolean = true;

  constructor() {
    this.isLoading = true;
  }

  ngOnInit(): void {
    // Définir la variable isLoading sur false après 2 secondes
    setTimeout(() => {
      this.isLoading = false;
    }, 9000);

    gsap.registerPlugin(ScrollTrigger);

    const onScroll = () => {
      // Supprimer l'écouteur d'événement après le premier défilement
      window.removeEventListener('scroll', onScroll);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: 'section',
          pin: true,
          start: 'top top',
          end: '+=200%',
          scrub: true,
        },
      });

      timeline
        .to('#sixth', { y: -700, duration: 6 })
        .to('#fifth', { y: -500, duration: 6 }, '-=6')
        .to('#forth', { y: -400, duration: 6 }, '-=6')
        .to('#third', { y: -300, duration: 6 }, '-=6')
        .to('#second', { y: -200, duration: 6 }, '-=6')
        .to('#first', { y: -100, duration: 6 }, '-=6')
        .to('.content, .blur', { top: '0%', duration: 6 }, '-=6')
        .to('.title, .footer-wrapper', { y: -600, duration: 6 }, '-=6')
        .from('.one', { y: 40, autoAlpha: 0, duration: 3 }, '-=4')
        .from('.two', { y: 40, autoAlpha: 0, duration: 3 }, '-=3.5')
        .from('.three', { y: 40, autoAlpha: 0, duration: 3 }, '-=3.5')
        .from('.four', { y: 40, autoAlpha: 0, duration: 3 }, '-=3.5')
        .from('.text', { y: 60, autoAlpha: 0, duration: 3 }, '-=4');
    };

    window.addEventListener('scroll', onScroll);
  }
}
