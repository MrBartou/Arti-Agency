import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string;
  password: string;
  loginError: string;

  constructor(private userService: UserService, private router: Router) {
    this.email = '';
    this.password = '';
    this.loginError = '';
  }

  onSubmit(): void {
    this.userService.login(this.email, this.password)
      .subscribe(
        (user: User | undefined) => {
          if (user) {
            this.router.navigate(['/page-suivante']);
          } else {
            this.loginError = 'Nom d\'utilisateur ou mot de passe incorrect.';
          }
        },
        error => {
          this.loginError = 'Une erreur est survenue lors de l\'authentification. Veuillez réessayer plus tard.';
          console.log(error);
        }
      );
  }
}
