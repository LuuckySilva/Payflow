import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterLink, Router } from '@angular/router'
import { AuthService } from '../../services/auth'

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  name = ''
  email = ''
  password = ''
  confirmPassword = ''
  errorMessage = ''
  showPassword = false
showConfirmPassword = false

  constructor(private authService: AuthService, private router: Router) {}

  isPasswordValid(): boolean {
    const hasMinLength = this.password.length >= 6
    const hasSpecialChar = /[@#$%^&*!]/.test(this.password)
    const hasLetter = /[a-zA-Z]/.test(this.password)
    return hasMinLength && hasSpecialChar && hasLetter
  }

  togglePassword() {
  this.showPassword = !this.showPassword
}

toggleConfirmPassword() {
  this.showConfirmPassword = !this.showConfirmPassword
}

  passwordsMatch(): boolean {
    return this.password === this.confirmPassword
  }

  onSubmit() {
    if (!this.isPasswordValid()) {
      this.errorMessage = 'A senha deve ter no mínimo 6 caracteres, uma letra e um caractere especial (@#$%^&*!)'
      return
    }

    if (!this.passwordsMatch()) {
      this.errorMessage = 'As senhas não coincidem'
      return
    }

    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token)
        this.router.navigate(['/dashboard'])
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Erro ao criar conta'
      }
    })
  }

}