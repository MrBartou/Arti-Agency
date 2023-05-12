import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showForm = false;

  constructor (private userService: UserService) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.userService.currentUser = JSON.parse(storedUser);
    }
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  title = 'ArtyAgency';
}
