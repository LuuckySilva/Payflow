import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AuthService } from '../../services/auth'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  email = ''
  password = ''
  errorMessage = ''

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token)
        this.router.navigate(['/dashboard'])
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Erro ao fazer login'
      }
    })
  }

}
