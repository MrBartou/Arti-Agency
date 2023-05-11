import { Component } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/interface/projet.interface';
import { FormData } from 'src/app/interface/formadata.interface';

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss']
})
export class FormComponent {
  projectData: FormData = {
    step1: {
      name: '',
      client: '',
      client_number: '',
      client_email: ''
    },
    step2: {
      start_date: '',
      end_date: '',
      collaborator: '',
      departement: '',
    }
  };
  currentStep = 1;

  constructor(private projectService: ProjectService) {}

  submitForm() {
    if (this.currentStep === 1) {
      if (this.isStep1Invalid()) {
        return;
      }
      this.nextStep();
    } else if (this.currentStep === 2) {
      if (this.isStep2Invalid()) {
        return;
      }

      const project: Project = {
        name: this.projectData.step1.name,
        client: this.projectData.step1.client,
        client_number: this.projectData.step1.client_number,
        client_email: this.projectData.step1.client_email,
        start_date: this.projectData.step2.start_date,
        end_date: this.projectData.step2.end_date,
        collaborator: this.projectData.step2.collaborator,
        departement: this.projectData.step2.departement,
        progress: 0,
        is_finish: false
      };

      this.projectService.addProject(project)
        .then(() => {
          location.reload();
        })
        .catch((error) => {
          console.error('Erreur lors de l\'ajout du projet:', error);
        });
    }
  }

  cancelForm() {
    location.reload();
  }

  nextStep() {
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }

  isStep1Invalid() {
    return !this.projectData.step1.name || !this.projectData.step1.client;
  }

  isStep2Invalid() {
    return !this.projectData.step2.start_date || !this.projectData.step2.end_date;
  }
}
