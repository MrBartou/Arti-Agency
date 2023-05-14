import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    endDate: this.formatEndDate(new Date())
  };

  newTask: Task = {
    projectName: '',
    taskName: '',
    taskStatus: '',
    department: '',
    memberAvatar: 'url_vers_image',
    endDate: this.formatEndDate(new Date())
  };
  updateFormVisible = false;
  projectName = '';

  constructor(private el: ElementRef, private TasksService: TaskService, private route: ActivatedRoute) {
    this.projectName = this.route.snapshot.params['projectName'];
    this.getTasksByDepartment(this.projectName, 'Développement');
    this.getTasksByDepartment(this.projectName, 'Marketing');
    this.getTasksByDepartment(this.projectName, 'Création');
    this.getTasksByStatus(this.projectName, 'todo');
    this.getTasksByStatus(this.projectName, 'progress');
    this.getTasksByStatus(this.projectName, 'review');
    this.getTasksByStatus(this.projectName, 'done');
  }

  ngAfterViewInit() {
    this.updateProgressBars();
  }

  formatEndDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
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
    this.selectedTask.endDate = this.formatEndDate(new Date());

    this.TasksService.updateTask(this.selectedTask)
      .then(() => {
        console.log("Task updated");
        this.updateFormVisible = false;
        form.reset();
      })
      .catch(err => {
        console.error("Error updating task", err);
      });
  }

  async onCreate(form: NgForm) {
    if (form.valid) {
      try {
        this.newTask.projectName = this.projectName;
        this.newTask.endDate = this.formatEndDate(new Date());
        await this.TasksService.addTask(this.newTask);
        this.showForm = false;
        form.reset();
      } catch (error) {
        console.error('Error creating task', error);
      }
    }
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
        this.devProgress = Number(completionPercentage.toFixed(1));
      } else if (department === 'Marketing') {
        this.marketingProgress = Number(completionPercentage.toFixed(1));
      } else if (department === 'Création') {
        this.creationProgress = Number(completionPercentage.toFixed(1));
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

