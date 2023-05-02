import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Project {
  id: number;
  name: string;
  client: string;
  client_number: string;
  client_email: string;
  start_date: string;
  end_date: string;
  collaborator: string;
  progress: number;
  departement: string;
  is_finish: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectUrl = 'assets/projects.json';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectUrl);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.projectUrl}/${id}`);
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectUrl, project);
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.projectUrl}/${project.id}`, project);
  }

  deleteProject(id: number): Observable<Project> {
    return this.http.delete<Project>(`${this.projectUrl}/${id}`);
  }
}
