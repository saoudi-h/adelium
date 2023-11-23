import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { AuthService } from '@auth/services/auth.service'
import { CustomValidators } from '@core/utility/CustomValidators'
import { FieldStatusComponent } from '@shared/components/form/field-status.component'
import { UserRegister } from './../../../core/dto/UserRegister'
import { SvgRegisterComponent } from './svg-register.component'

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        CommonModule,
        SvgRegisterComponent,
        ReactiveFormsModule,
        FieldStatusComponent,
    ],
    templateUrl: './register.component.html',
    styles: [],
})
export class RegisterComponent {
    registerForm: FormGroup = this.fb.group({
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
                CustomValidators.passwordMatch(
                    () => this.registerForm?.get('password') || null
                ),
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

        this.authService.register(userRegister as UserRegister).subscribe({
            next: () => {
                console.log('Bienvenue.')
            },
            error: error => {
                if (error.status === 400) {
                    alert('Erreur : ' + error.error)
                } else {
                    alert(
                        "Erreur lors de l'enregistrement : " +
                            JSON.stringify(error)
                    )
                }
            },
        })
    }
}
