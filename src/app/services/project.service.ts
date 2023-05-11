import { Injectable } from '@angular/core';
import { Project } from '../interface/projet.interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private dbName = 'projectDB';
  private objectStoreName = 'projects';
  private projectsSubject: Subject<Project[]> = new Subject<Project[]>();
  private hasAddedFakeProjects = false;

  constructor() {
    this.addFakeProjects();
  }

  private async addFakeProjects(): Promise<void> {
    const existingProjects = await this.getProjectsFromDatabase();
    if (existingProjects.length > 0 || this.hasAddedFakeProjects) {
      return;
    }

    const fakeProjects: Project[] = [
      {
        name: 'Projet 1',
        client: 'Client 1',
        client_number: '0123456789',
        client_email: 'client1@example.com',
        start_date: '2023-01-01',
        end_date: '2023-12-31',
        collaborator: 'Collaborateur 1',
        progress: 50,
        departement: 'Département 1',
        is_finish: false
      },
      {
        name: 'Projet 2',
        client: 'Client 2',
        client_number: '9876543210',
        client_email: 'client2@example.com',
        start_date: '2023-02-01',
        end_date: '2023-11-30',
        collaborator: 'Collaborateur 2',
        progress: 80,
        departement: 'Département 2',
        is_finish: false
      },
    ];

    fakeProjects.forEach((project) => {
      this.addProject(project)
        .then(() => console.log('Projet ajouté avec succès:', project))
        .catch((error) => console.error('Erreur lors de l\'ajout du projet:', error));
    });

    this.hasAddedFakeProjects = true;
  }

  async addProject(projectData: Project): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);
    await objectStore.add(projectData);
    this.fetchProjects();
  }

  getProjects(): Observable<Project[]> {
    this.fetchProjects();
    return this.projectsSubject.asObservable();
  }

  async deleteProject(projectId: string): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);
    await objectStore.delete(projectId);
    this.fetchProjects();
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

  private fetchProjects(): void {
    this.getProjectsFromDatabase()
      .then((projects: Project[]) => {
        this.projectsSubject.next(projects);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des projets:', error);
        this.projectsSubject.next([]);
      });
  }

  private getProjectsFromDatabase(): Promise<Project[]> {
    return new Promise((resolve, reject) => {
      this.openDatabase()
        .then((db: IDBDatabase) => {
          const transaction = db.transaction(this.objectStoreName, 'readonly');
          const objectStore = transaction.objectStore(this.objectStoreName);
          const projects: Project[] = [];

          const request = objectStore.openCursor();
          request.onsuccess = (event: any) => {
            const cursor = event.target.result;
            if (cursor) {
              projects.push(cursor.value);
              cursor.continue();
            } else {
              resolve(projects);
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
