import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss']
})
export class FormComponent {
  projectData = {
    name: '',
    client: '',
    client_number: '',
    client_email: '',
    start_date: '',
    end_date: '',
    collaborator: '',
    progress: ''
  };

  constructor(private http: HttpClient) { }

  submitForm() {
    const jsonProjectData = JSON.stringify(this.projectData);

    // You can then send the jsonProjectData to a server
    // For example, if you have an endpoint at 'http://localhost:3000/api/project', you can do:
    this.http.post('http://localhost:3000/api/project', jsonProjectData).subscribe(response => {
      // handle the response here
      console.log("data sent to server");
    });

    // "Close" the form by reloading the page
    location.reload();
  }

  cancelForm() {
    // "Close" the form by reloading the page
    location.reload();
  }
}
