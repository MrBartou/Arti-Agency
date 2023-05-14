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
        collaborator: 'https://images.unsplash.com/photo-1634201776710-4025b2b1beca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
        progress: 50,
        departement: 'Web développement',
        is_finish: false
      },
      {
        name: 'Projet 2',
        client: 'Client 2',
        client_number: '9876543210',
        client_email: 'client2@example.com',
        start_date: '2023-02-01',
        end_date: '2023-11-30',
        collaborator: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
        progress: 80,
        departement: 'Création graphique',
        is_finish: false
      },
      {
        name: 'Projet 3',
        client: 'Client 3',
        client_number: '0123456789',
        client_email: 'client3@exemple.com',
        start_date: '2023-03-01',
        end_date: '2023-10-31',
        collaborator: 'https://images.unsplash.com/photo-1521146764736-56c929d59c83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
        progress: 10,
        departement: 'Marketing',
        is_finish: false
      },
      {
        name: 'Projet 5',
        client: 'Client 2',
        client_number: '9876543210',
        client_email: 'client2@example.com',
        start_date: '2023-02-01',
        end_date: '2023-11-30',
        collaborator: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
        progress: 80,
        departement: 'Création graphique',
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

  searchProjects(searchTerm: string): Observable<Project[]> {
    this.fetchProjects(searchTerm);
    return this.projectsSubject.asObservable();
  }

  async addProject(projectData: Project): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);
    await objectStore.add(projectData);
    this.fetchProjects();
  }

  async deleteProjectByName(projectName: string): Promise<void> {
    const projects = await this.getProjectsFromDatabase();
    const project = projects.find(p => p.name === projectName);
    if (project) {
      await this.deleteProject(project);
    }
    this.fetchProjects();
  }

  getProjects(searchTerm: string = ''): Observable<Project[]> {
    this.fetchProjects(searchTerm);
    return this.projectsSubject.asObservable();
  }

  async getTotalProjects(): Promise<number> {
    const projects = await this.getProjectsFromDatabase();
    return projects.length;
  }

  async getUnfinishedProjectsCount(): Promise<number> {
    const projects = await this.getProjectsFromDatabase();
    return projects.filter(project => !project.is_finish).length;
  }

  async getFinishedProjectsCount(): Promise<number> {
    const projects = await this.getProjectsFromDatabase();
    return projects.filter(project => project.is_finish).length;
  }

  async deleteProject(project: Project): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);
    const request = objectStore.openCursor();
  
    request.onsuccess = (event: any) => {
      const cursor = event.target.result;
      if (cursor) {
        if (cursor.value.name === project.name) {
          cursor.delete();
        }
        cursor.continue();
      }
    };
  
    request.onerror = (event: any) => {
      console.error('Erreur lors de la suppression du projet:', event.target.error);
    };
  
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

  private fetchProjects(searchTerm: string = ''): void {
    this.getProjectsFromDatabase()
      .then((projects: Project[]) => {
        const filteredProjects = this.filterProjects(projects, searchTerm);
        this.projectsSubject.next(filteredProjects);
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

  private filterProjects(projects: Project[], searchTerm: string): Project[] {
    if (!searchTerm || searchTerm.trim() === '') {
      return projects;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return projects.filter((project: Project) => {
      // Modifier les conditions de filtrage en fonction de vos besoins
      return (
        project.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        project.client.toLowerCase().includes(lowerCaseSearchTerm) ||
        project.departement.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });
  }

  async updateProject(project: Project): Promise<void> {
    const db = await this.openDatabase();
    const transaction = db.transaction(this.objectStoreName, 'readwrite');
    const objectStore = transaction.objectStore(this.objectStoreName);
    await objectStore.put(project);
    this.fetchProjects();
  }
}
