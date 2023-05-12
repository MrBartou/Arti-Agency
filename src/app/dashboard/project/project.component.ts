import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements AfterViewInit {
  private dragSrcEl: HTMLElement | null = null;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.addDragDropFunctionality();
    this.addDropFunctionalityToColumns();
    this.updateProgressBars();
  }

  private addDragDropFunctionality() {
    const items = this.el.nativeElement.querySelectorAll('.task');
    items.forEach((item: HTMLElement) => {
      item.addEventListener('dragstart', this.handleDragStart.bind(this), false);
      item.addEventListener('dragenter', this.handleDragEnter.bind(this), false);
      item.addEventListener('dragover', this.handleDragOver.bind(this), false);
      item.addEventListener('dragleave', this.handleDragLeave.bind(this), false);
      item.addEventListener('drop', this.handleDrop.bind(this), false);
      item.addEventListener('dragend', this.handleDragEnd.bind(this), false);
    });
  }

  private addDropFunctionalityToColumns() {
    const columns = this.el.nativeElement.querySelectorAll('.project-column');
    columns.forEach((column: HTMLElement) => {
      column.addEventListener('dragover', this.handleColumnDragOver.bind(this), false);
      column.addEventListener('drop', this.handleColumnDrop.bind(this), false);
    });
  }

  private handleDragStart(e: DragEvent) {
    if (!e.target) return;
    const target = e.target as HTMLElement;
    target.style.opacity = '0.1';
    target.style.border = '3px dashed #c4cad3';

    this.dragSrcEl = target;

    e.dataTransfer!.effectAllowed = 'move';
    e.dataTransfer!.setData('text/html', this.dragSrcEl.outerHTML);
  }

  private handleDragOver(e: DragEvent) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer!.dropEffect = 'move';

    return false;
  }

  private handleDragEnter(e: Event) {
    if (!e.target) return;
    const target = e.target as HTMLElement;
    target.classList.add('task-hover');
  }

  private handleDragLeave(e: Event) {
    if (!e.target) return;
    const target = e.target as HTMLElement;
    target.classList.remove('task-hover');
  }

  private handleDrop(e: DragEvent) {
    if (!e.target) return;
    const target = e.target as HTMLElement;

    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    if (this.dragSrcEl && this.dragSrcEl !== target) {
      this.dragSrcEl.innerHTML = target.innerHTML;
      target.innerHTML = e.dataTransfer!.getData('text/html');
    }

    this.updateProgressBars();

    return false;
  }

  private handleDragEnd(e: Event) {
    if (!e.target) return;
    const target = e.target as HTMLElement;
    target.style.opacity = '1';
    target.style.border = '0';

    const items = this.el.nativeElement.querySelectorAll('.task');
    items.forEach((item: HTMLElement) => {
      item.classList.remove('task-hover');
    });
  }

  private handleColumnDragOver(e: DragEvent) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer!.dropEffect = 'move';

    return false;
  }

  private handleColumnDrop(e: DragEvent) {
    if (!e.target) return;
    const target = e.target as HTMLElement;

    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    if (this.dragSrcEl) {
      target.appendChild(this.dragSrcEl);
      this.dragSrcEl.style.opacity = '1';
      this.dragSrcEl.style.border = '0';
    }

    this.updateProgressBars();

    return false;
  }

  private updateProgressBars() {
    const categories = ['Copywriting', 'Illustration', 'UI Design'];
    const doneColumn = this.el.nativeElement.querySelector('.project-column[title="done"]');

    categories.forEach(category => {
      const totalTasks = this.el.nativeElement.querySelectorAll(`.task[data-category="${category}"]`).length;
      const doneTasks = doneColumn.querySelectorAll(`.task[data-category="${category}"]`).length;

      const progressBar = this.el.nativeElement.querySelector(`.tag-progress[data-category="${category}"]`);
      if (progressBar) {
        progressBar.setAttribute('max', totalTasks.toString());
        progressBar.setAttribute('value', doneTasks.toString());
      }
    });
  }
}

