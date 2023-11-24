import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { UserLogin } from '@core/dto/UserLogin'
import { NotificationService } from '@core/services/notification.service'
import { FieldStatusComponent } from '@shared/components/form/field-status.component'
import { AuthService } from '../../services/auth.service'
import { SvgLoginComponent } from './svg-login.component'

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        SvgLoginComponent,
        ReactiveFormsModule,
        FieldStatusComponent,
    ],
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
                Validators.minLength(8),
                Validators.maxLength(40),
                // CustomValidators.password(),
            ],
        ],
    })

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private notification: NotificationService
    ) {}

    onSubmit() {
        if (!this.loginForm.valid) return
        const userLogin: UserLogin = this.loginForm.value as UserLogin
        this.authService.login(userLogin).subscribe({
            next: response => {
                if (!response) {
                    this.notification.error(
                        'Une erreur est survenue lors de la connexion.',
                        'Erreur de connexion',
                        {
                            dismissible: false,
                        }
                    )
                    return
                }
                this.notification.success(
                    'Vous êtes maintenant connecté.',
                    'Bienvenue',
                    {
                        dismissible: true,
                    }
                )
            },
            error: error => {
                this.notification.error(error.message, 'Erreur de connexion', {
                    dismissible: true,
                })
            },
        })
    }
}
