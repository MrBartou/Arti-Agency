import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { CommandesService } from '../../services/commandes.service';
import { Project } from '../../interface/projet.interface';
import { Commande } from '../../interface/commandes.interface';
import { Observable, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isDropdownOpen = false;
  projects$: Observable<Project[]>;
  showForm: any;
  commandes: Commande[] = [];
  searchTerm: string = '';
  searchControl: FormControl = new FormControl('');

  totalProjects: number = 0;
  totalProjectsCompleted: number = 0;
  totalProjectsInProgress: number = 0;

  departments: string[] = ['Web développement', 'Création graphique', 'Marketing'];
  departmentColors: {[key: string]: {primary: string, secondary: string}};

  selectedProject: Project | null = null;

  currentDate: Date = new Date();
  options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };
  formattedDate: string = this.currentDate.toLocaleDateString('fr-FR', this.options);

  constructor(private projectService: ProjectService, private commandesService: CommandesService, private router: Router, public userService: UserService) {
    this.projects$ = this.projectService.getProjects();
    this.departmentColors = this.assignColorsToDepartments();
  }

  ngOnInit() {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects$ = of(projects);
    });

    this.getProjectCounts();

    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((searchTerm: string) => {
        this.projectService.getProjects(searchTerm).subscribe((projects) => {
          this.projects$ = of(projects);
        });
      });
    this.commandesService.getCommandes().subscribe((commandes) => {
      this.commandes = commandes;
    });
  }

  dateElement: HTMLElement | null = document.getElementById('date');
  if (dateElement: any) {
    dateElement.innerText = this.formattedDate;
  }

  assignColorsToDepartments(): {[key: string]: {primary: string, secondary: string}} {
    let colors: {[key: string]: {primary: string, secondary: string}} = {
      'Web développement': {primary: '#fee4cb', secondary: '#ff942e'},
      'Création graphique': {primary: '#e9e7fd', secondary: '#4f3ff0'},
      'Marketing': {primary: '#c8f7dc', secondary: '#34c471'}
    };
    let departmentColors: {[key: string]: {primary: string, secondary: string}} = {};

    for (let i = 0; i < this.departments.length; i++) {
      let department = this.departments[i];
      departmentColors[department] = colors[department as keyof typeof colors];
    }

    return departmentColors;
  }

  async getProjectCounts(): Promise<void> {
    this.totalProjects = await this.projectService.getTotalProjects();
    this.totalProjectsInProgress = await this.projectService.getUnfinishedProjectsCount();
    this.totalProjectsCompleted = await this.projectService.getFinishedProjectsCount();
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

  deleteProject(projectName: string): void {
    this.projectService.deleteProjectByName(projectName);
  }

  editProject(project: Project): void {
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
    } else {
      this.selectedProject = project;
      this.isDropdownOpen = true;
    }
  }

  updateProject(project: Project): void {
    this.projectService.updateProject(project);
    this.selectedProject = null;
  }

  calculateDateDifference(start: string, end: string): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    return differenceInDays;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.userService.currentUser = undefined;
    this.router.navigate(['/login']);
  }
}
