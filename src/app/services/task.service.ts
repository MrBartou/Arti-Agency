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
  private hasAddedFakeTasks = false;

  constructor() {
    this.addFakeTask();
  }

  private async addFakeTask(): Promise<void> {
    const existingTasks = await this.getTasksFromDatabase();
    if (existingTasks.length > 0 || this.hasAddedFakeTasks) {
      return;
    }

    const fakeTasks: Task[] = [
      {
        projectName: 'Projet A',
        memberAvatar: 'avatar1.jpg',
        endDate: 'Nov 24',
        taskName: 'Tâche 1',
        taskStatus: 'todo',
        department: 'Développement'
      },
      {
        projectName: 'Projet A',
        memberAvatar: 'avatar2.jpg',
        endDate: 'Nov 24',
        taskName: 'Tâche 2',
        taskStatus: 'progress',
        department: 'Marketing'
      },
      {
        projectName: 'Projet A',
        memberAvatar: 'avatar3.jpg',
        endDate: 'Nov 24',
        taskName: 'Tâche 3',
        taskStatus: 'review',
        department: 'Création'
      },
      {
        projectName: 'Projet A',
        memberAvatar: 'avatar4.jpg',
        endDate: 'Nov 24',
        taskName: 'Tâche 4',
        taskStatus: 'done',
        department: 'Développement'
      },
      {
        projectName: 'Projet A',
        memberAvatar: 'avatar5.jpg',
        endDate: 'Nov 24',
        taskName: 'Tâche 5',
        taskStatus: 'progress',
        department: 'Marketing'
      },
      {
        projectName: 'Projet B',
        memberAvatar: 'avatar6.jpg',
        endDate: 'Nov 24',
        taskName: 'Tâche 1',
        taskStatus: 'done',
        department: 'Développement'
      },
      {
        projectName: 'Projet B',
        memberAvatar: 'avatar7.jpg',
        endDate: 'Nov 24',
        taskName: 'Tâche 2',
        taskStatus: 'progress',
        department: 'Marketing'
      },
      {
        projectName: 'Projet B',
        memberAvatar: 'avatar8.jpg',
        endDate: 'Nov 24',
        taskName: 'Tâche 3',
        taskStatus: 'review',
        department: 'Création'
      },
      {
        projectName: 'Projet B',
        memberAvatar: 'avatar9.jpg',
        endDate: 'Nov 24',
        taskName: 'Tâche 4',
        taskStatus: 'done',
        department: 'Développement'
      },
      {
        projectName: 'Projet B',
        memberAvatar: 'avatar10.jpg',
        endDate: 'Nov 24',
        taskName: 'Tâche 5',
        taskStatus: 'todo',
        department: 'Marketing'
      }
    ];

    fakeTasks.forEach((Tasks) => {
      this.addTask(Tasks)
        .then(() => console.log('Tasks ajouté avec succès:', Tasks))
        .catch((error) => console.error('Erreur lors de l\'ajout des tasks:', error));
    });

    this.hasAddedFakeTasks = true;
  }

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

  getTaskByDepartment(department: string, projectName?: string): Observable<number> {
    return new Observable<number>((observer) => {
      this.getTasks()
        .subscribe((tasks: Task[]) => {
          let filteredTasks = tasks.filter((task) => task.department === department);

          if (projectName) {
            filteredTasks = filteredTasks.filter((task) => task.projectName === projectName);
          }

          const completedTasks = filteredTasks.filter((task) => task.taskStatus === 'Terminée');
          const completionPercentage = (completedTasks.length / filteredTasks.length) * 100;
          observer.next(completionPercentage);
        });
    });
  }

  getTasksByStatus(status: string, projectName?: string): Observable<Task[]> {
    return new Observable<Task[]>((observer) => {
      this.getTasks()
        .subscribe((tasks: Task[]) => {
          let filteredTasks = tasks.filter((task) => task.taskStatus === status);

          if (projectName) {
            filteredTasks = filteredTasks.filter((task) => task.projectName === projectName);
          }

          observer.next(filteredTasks);
        });
    });
  }

  getTasksByProject(projectName: string): Observable<Task[]> {
    return new Observable<Task[]>((observer) => {
      this.getTasks()
        .subscribe((tasks: Task[]) => {
          const filteredTasks = tasks.filter((task) => task.projectName === projectName);
          observer.next(filteredTasks);
        });
    });
  }

  updateTask(task: Task): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.openDatabase()
        .then((db: IDBDatabase) => {
          const transaction = db.transaction(this.objectStoreName, 'readwrite');
          const objectStore = transaction.objectStore(this.objectStoreName);
          const request = objectStore.put(task);

          request.onsuccess = () => {
            this.fetchTasks();
            resolve();
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
