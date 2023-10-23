import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { UserLogin } from '@core/dto/UserLogin'
import { AuthService } from './../../../core/services/auth.service'
import { SvgLoginComponent } from './svg-login.component'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, SvgLoginComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        // Validators.minLength(8),
        // Validators.maxLength(40),
        // this.passwordValidator(),
      ],
    ],
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  onSubmit() {
    if (!this.loginForm.valid) return
    const userLogin: UserLogin = this.loginForm.value as UserLogin
    this.authService.login(userLogin)
    // this.authService.login(userLogin).subscribe({
    //   next: response => {
    //     if (!response) {
    //       throw new Error('Vous êtes déjà connecté.')
    //     }
    //   },
    //   error: error => {
    //     alert(JSON.stringify(error))
    //   },
    // })
  }

  passwordValidator() {
    return (control: AbstractControl) => {
      const password = control.value
      const hasNumber = /\d/.test(password)
      const hasUpper = /[A-Z]/.test(password)
      const hasLower = /[a-z]/.test(password)
      const hasSpecial = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password)

      const isValid = hasNumber && hasUpper && hasLower && hasSpecial

      return isValid ? null : { complexPassword: true }
    }
  }
}
