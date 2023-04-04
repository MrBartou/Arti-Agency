import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements AfterViewInit {
  @ViewChild('modalDeveloppement') modalDeveloppement: ElementRef | undefined;
  @ViewChild('modalCreation') modalCreation: ElementRef | undefined;
  @ViewChild('modalMarketing') modalMarketing: ElementRef | undefined;

  constructor() {
    this.modalDeveloppement = undefined;
    this.modalCreation = undefined;
    this.modalMarketing = undefined;
  }

  ngAfterViewInit(): void {
    // Initialise les propriétés des modals dans la méthode ngAfterViewInit
    this.modalDeveloppement = this.getModal('developpement');
    this.modalCreation = this.getModal('creation');
    this.modalMarketing = this.getModal('marketing');
  }

  openModal(category: string) {
    const modal = this.getModal(category);
    modal.nativeElement.classList.add('modal--active');
  }

  closeModal(category: string) {
    const modal = this.getModal(category);
    modal.nativeElement.classList.remove('modal--active');
  }

  private getModal(category: string): ElementRef {
    switch (category) {
      case 'developpement':
        return this.modalDeveloppement!;
      case 'creation':
        return this.modalCreation!;
      case 'marketing':
        return this.modalMarketing!;
      default:
        throw new Error('Modal not found for category: ' + category);
    }
  }
}






