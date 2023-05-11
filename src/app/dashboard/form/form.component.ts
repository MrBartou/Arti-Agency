import { Component } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/interface/projet.interface';

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss']
})
export class FormComponent {
  projectData: Project = {
    name: '',
    client: '',
    client_number: '',
    client_email: '',
    start_date: '',
    end_date: '',
    collaborator: '',
    progress: 0,
    departement: '',
    is_finish: false
  };

  constructor(private projectService: ProjectService) { }

  submitForm() {
    this.projectService.addProject(this.projectData)
      .then(() => {
        location.reload();
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout du projet:', error);
      });
  }

  cancelForm() {
    location.reload();
  }
}
