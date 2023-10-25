import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthService } from '@core/services/auth.service'
import { CustomValidators } from '@core/utility/CustomValidators'
import { UserRegister } from './../../../core/dto/UserRegister'
import { SvgRegisterComponent } from './svg-register.component'

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, SvgRegisterComponent, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styles: [],
})
export class RegisterComponent {
    registerForm = this.fb.group({
        username: ['', [Validators.required, Validators.email]],
        password: [
            '',
            [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(40),
                CustomValidators.password(),
            ],
        ],
        repeatPassword: [
            '',
            [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(40),
                // CustomValidators.passwordMatch('password'),
            ],
        ],
        firstname: [
            '',
            [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(20),
            ],
        ],
        lastname: [
            '',
            [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(20),
            ],
        ],
        phone: [
            '',
            [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(15),
            ],
        ],
    })

    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ) {}

    onClick() {
        alert(JSON.stringify(this.registerForm.getRawValue()))
    }
    onSubmit() {
        if (!this.registerForm.valid) return
        const { repeatPassword, ...userRegister } = this.registerForm.value
        this.authService.register(userRegister as UserRegister)

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
}
