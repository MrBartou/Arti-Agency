import { Component, OnInit } from '@angular/core';
import { gsap } from "gsap";
import Flip from "gsap/Flip";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  layouts = ["final", "plain", "columns", "grid"];
  container: HTMLElement | null = null;
  curLayout = 0;

  ngOnInit(): void {
    gsap.registerPlugin(Flip);
    this.container = document.querySelector(".container");
    this.nextState();
  }

  nextState(): void {
    const state = Flip.getState(".letter, .for, .gsap", {
      props: "color,backgroundColor",
      simple: true,
    });

    if (this.container) {
      this.container.classList.remove(this.layouts[this.curLayout]);
      this.curLayout = (this.curLayout + 1) % this.layouts.length;
      this.container.classList.add(this.layouts[this.curLayout]);

      Flip.from(state, {
        absolute: true,
        stagger: 0.07,
        duration: 0.7,
        ease: "power2.inOut",
        spin: this.curLayout === 0,
        simple: true,
        onEnter: (elements: Element[]) => gsap.to(Array.from(elements) as HTMLElement[], { opacity: 1, delay: 0.1 }),
        onLeave: (elements: Element[]) => gsap.to(Array.from(elements) as HTMLElement[], { opacity: 0 }),
      });
    }

    gsap.delayedCall(this.curLayout === 0 ? 3.5 : 1.5, () => this.nextState());
  }
}
