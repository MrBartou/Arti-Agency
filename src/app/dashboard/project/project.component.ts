import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/interface/task.interface';
import { TaskService } from 'src/app/services/task.service';

interface ProgressBarValues {
  [category: string]: number;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements AfterViewInit {
  private dragSrcEl: HTMLElement | null = null;
  devProgress = 0;
  marketingProgress = 0;
  creationProgress = 0;
  projectTasks: Task[] = [];
  todoTasks: Task[] = [];
  progressTasks: Task[] = [];
  reviewTasks: Task[] = [];
  doneTasks: Task[] = [];
  showForm = false;

  selectedTask: Task = {
    projectName: '',
    taskName: '',
    taskStatus: '',
    department: '',
    memberAvatar: 'url_vers_image',
    endDate: new Date().toISOString()
  };
  updateFormVisible = false;

  constructor(private el: ElementRef, private TasksService: TaskService) {
    this.getTasksByDepartment('Projet A', 'Développement');
    this.getTasksByDepartment('Projet A', 'Marketing');
    this.getTasksByDepartment('Projet A', 'Création');
    this.getTasksByStatus('Projet A', 'todo');
    this.getTasksByStatus('Projet A', 'progress');
    this.getTasksByStatus('Projet A', 'review');
    this.getTasksByStatus('Projet A', 'done');
  }

  ngAfterViewInit() {
    this.updateProgressBars();
  }

  getTagClass(department: string): string {
    switch (department) {
      case 'Développement':
        return 'task__tag--developpement';
      case 'Marketing':
        return 'task__tag--marketing';
      case 'Création':
        return 'task__tag--creation';
      default:
        return '';
    }
  }

  openForm(task: Task) {
    this.selectedTask = task;
    this.updateFormVisible = true;
  }

  onUpdate(form: NgForm) {
    this.TasksService.updateTask(this.selectedTask)
      .then(() => {
        console.log("Task updated");
        this.updateFormVisible = false;
        form.reset();
        // Refresh tasks or do other necessary updates
      })
      .catch(err => {
        console.error("Error updating task", err);
      });
  }

  private getTasksByStatus(projectName: string, status: string) {
    this.TasksService.getTasksByStatus(status, projectName).subscribe((tasks: Task[]) => {
      switch (status) {
        case 'todo':
          this.todoTasks = tasks;
          break;
        case 'progress':
          this.progressTasks = tasks;
          break;
        case 'review':
          this.reviewTasks = tasks;
          break;
        case 'done':
          this.doneTasks = tasks;
          break;
      }
    });
  }

  private getTasksByDepartment(projectName: string, department: string) {
    this.TasksService.getTaskByDepartment(department, projectName).subscribe((completionPercentage: number) => {
      if (department === 'Développement') {
        this.devProgress = completionPercentage;
      } else if (department === 'Marketing') {
        this.marketingProgress = completionPercentage;
      } else if (department === 'Création') {
        this.creationProgress = completionPercentage;
      }
    });
  }

  private updateProgressBars() {
    const categories = ['developpement', 'marketing', 'creation'];
    const progressBarValues: ProgressBarValues = {
      'developpement': this.devProgress / 100,
      'marketing': this.marketingProgress / 100,
      'creation': this.creationProgress / 100
    };
    categories.forEach(category => {
      const totalTasks = this.el.nativeElement.querySelectorAll(`.task[data-category="${category}"]`).length;
      const completedTasks = Math.round(progressBarValues[category] * totalTasks);
      const progressBar = this.el.nativeElement.querySelector(`.tag-progress[data-category="${category}"]`);
      if (progressBar) {
        progressBar.setAttribute('max', totalTasks.toString());
        progressBar.setAttribute('value', completedTasks.toString());
      }
    });
  }
}

