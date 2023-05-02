import { AfterViewInit, Component } from '@angular/core';
import { ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { gsap, Expo } from 'gsap';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CSSPlugin } from "gsap/CSSPlugin";

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.scss']
})
export class ProjetComponent implements OnInit, AfterViewInit {
  @ViewChild("projects") projects?: ElementRef;
  @ViewChild("project_close") projectClose?: ElementRef;
  @ViewChildren("project_item") projectItems?: QueryList<ElementRef>;
  @ViewChild("project_page") projectPage?: ElementRef;

  constructor() { }

  ngOnInit(): void {
    gsap.registerPlugin(ScrollToPlugin);
    gsap.registerPlugin(CSSPlugin);
  }

  ngAfterViewInit() {
    if (this.projectClose) {
      if(this.projectClose.nativeElement){
        this.projectClose.nativeElement.addEventListener("click", this.onProjectClose.bind(this));
      }
    }

    if (this.projectItems) {
      this.projectItems.forEach((item: ElementRef) => {
        item.nativeElement.addEventListener("click", this.onProjectClick.bind(this));
      });
    }
  }

  onProjectClick(event: any): void {
    const { target } = event;
    const { index } = target.dataset;
    const { width, height, top, left } = target.getBoundingClientRect();
    const clone = document.createElement("div");
    if (this.projectClose) {
      this.projectClose.nativeElement.classList.remove('closed');
    }
    clone.style.height = height + "px";
    clone.style.width = width + "px";
    clone.style.top = top + "px";
    clone.style.left = left + "px";
    clone.style.position = "absolute";
    clone.style.zIndex = "10";
    clone.classList.add("project-item");
    clone.classList.add("clone");
    clone.innerHTML = target.innerHTML;
    if (this.projectPage) {
      this.projectPage.nativeElement.appendChild(clone);
    }
  
    const title = clone.querySelector(".project-title");
    const hero = clone.querySelector(".project-hero");
    const projectContent = clone.querySelector(".project-content");
    const duration = 1.5;
  
    const tl = gsap.timeline();
  
    tl.add("scaleFS")
      .to(clone, {
        duration,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        borderRadius: "0px",
        ease: Expo.easeInOut
      }, "scaleFS")
      .to(title, {
        duration,
        fontSize: "60px",
        ease: Expo.easeInOut
      }, "scaleFS")
      .to(hero, {
        duration,
        padding: "5vw 8vw",
        ease: Expo.easeInOut
      }, "scaleFS")
      .add(() => {
        window.scrollTo(0, 0);
        if (this.projectPage && this.projectPage.nativeElement.children.length > 1) {
          this.projectPage.nativeElement.firstElementChild?.remove();
        }
        document.body.classList.add("project-active");
        if (this.projects) {
          Array.from(this.projects.nativeElement.children).forEach((child: unknown, index: number, array: unknown[]) => {
            if (child instanceof HTMLElement) {
              child.classList.remove("active");
            }
          });
          this.projects.nativeElement.children[parseInt(index)].classList.add("active");
        }
      })
      .add(() => {
        const projectHero = clone.querySelector(".project-hero");
        gsap.set(clone, {
          position: "relative",
          height: "auto",
          minHeight: "100vh"
        });
        gsap.set(projectHero, {
          height: "100vh"
        });
      })
      .to(projectContent, {
        duration: 1.5,
        opacity: 1,
        ease: Expo.easeInOut
      }, "scaleFS");
  }

  onProjectClose(): void {
    const clone = document.querySelector(".clone");
    if (this.projectClose) {
      this.projectClose.nativeElement.classList.add('closed');
    }
    if (clone) {
      const projectHero = clone.querySelector(".project-hero");
      const projectContent = clone.querySelector(".project-content");
      const duration = 1;

      gsap.timeline()
        .add("close")
        .to([projectHero, projectContent], {
          duration,
          height: "0vh",
          padding: "0",
          ease: Expo.easeInOut
        }, "close")
        .to(clone, {
          duration,
          minHeight: "0vh",
          ease: Expo.easeInOut,
          onComplete() {
            clone.remove();
          }
        }, "close")
        .to(projectContent?.children || [], {
          duration,
          opacity: 0,
          ease: Expo.easeInOut
        }, "close")
        .to(window, {
          duration,
          scrollTo: {
            y: 0
          },
          ease: Expo.easeInOut
        }, "close")
        .add(() => {
          document.body.classList.remove("project-active");
          if (this.projects) {
            Array.from(this.projects.nativeElement.children).forEach((child: unknown, index: number, array: unknown[]) => {
              if (child instanceof HTMLElement) {
                child.classList.remove("active");
              }
            });
          }
        });
    }
  }
}