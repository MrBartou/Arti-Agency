import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../interface/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private dbName = 'taskDB';
  private objectStoreName = 'tasks';
  private tasksSubject: Subject<Task[]> = new Subject<Task[]>();

  constructor() { }

  async addTask(task: Task): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);
    await objectStore.add(task);
    this.fetchTasks();
  }

  getTasks(): Observable<Task[]> {
    this.fetchTasks();
    return this.tasksSubject.asObservable();
  }

  async deleteTask(id: number): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);
    await objectStore.delete(id);
    this.fetchTasks();
  }

  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName);

      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        const db = request.result;
        resolve(db);
      };

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(this.objectStoreName)) {
          db.createObjectStore(this.objectStoreName, { keyPath: 'id', autoIncrement: true });
        }
      };
    });
  }

  private fetchTasks(): void {
    this.getTasksFromDatabase()
      .then((tasks: Task[]) => {
        this.tasksSubject.next(tasks);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des tâches:', error);
        this.tasksSubject.next([]);
      });
  }

  private getTasksFromDatabase(): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      this.openDatabase()
        .then((db: IDBDatabase) => {
          const transaction = db.transaction(this.objectStoreName, 'readonly');
          const objectStore = transaction.objectStore(this.objectStoreName);
          const tasks: Task[] = [];

          const request = objectStore.openCursor();
          request.onsuccess = (event: any) => {
            const cursor = event.target.result;
            if (cursor) {
              tasks.push(cursor.value);
              cursor.continue();
            } else {
              resolve(tasks);
            }
          };

          request.onerror = (event: any) => {
            reject(request.error);
          };
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
