import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../interface/projet.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  projects$: Observable<Project[]>;
  showForm: any;

  constructor(private projectService: ProjectService) {
    this.projects$ = this.projectService.getProjects();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    document.addEventListener('DOMContentLoaded', () => {
      const modeSwitch = document.querySelector('.mode-switch') as HTMLElement;

      modeSwitch.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        modeSwitch.classList.toggle('active');
      });

      const listView = document.querySelector('.list-view') as HTMLElement;
      const gridView = document.querySelector('.grid-view') as HTMLElement;
      const projectsList = document.querySelector('.project-boxes') as HTMLElement;

      listView.addEventListener('click', () => {
        gridView.classList.remove('active');
        listView.classList.add('active');
        projectsList.classList.remove('jsGridView');
        projectsList.classList.add('jsListView');
      });

      gridView.addEventListener('click', () => {
        gridView.classList.add('active');
        listView.classList.remove('active');
        projectsList.classList.remove('jsListView');
        projectsList.classList.add('jsGridView');
      });

      document.querySelector('.messages-btn')?.addEventListener('click', () => {
        document.querySelector('.messages-section')?.classList.add('show');
      });

      document.querySelector('.messages-close')?.addEventListener('click', () => {
        document.querySelector('.messages-section')?.classList.remove('show');
      });
    });
  }

  // Partie formulaire

  isFormVisible: boolean = false;

  openForm() {
    this.isFormVisible = true;
  }
}
