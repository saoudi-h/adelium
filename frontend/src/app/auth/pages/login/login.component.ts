import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { UserLogin } from '@core/dto/UserLogin'
import { Store } from '@ngrx/store'
import { FieldStatusComponent } from '@shared/components/form/field-status.component'
import * as AuthActions from '@store/auth/auth.actions'
import { GithubOauthActions } from '@store/auth/oauth2/github/github-oauth.actions'
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
        private store: Store
    ) {}

    onSubmit() {
        if (!this.loginForm.valid) return

        const userLogin: UserLogin = this.loginForm.value as UserLogin
        this.store.dispatch(AuthActions.login({ userLogin }))
    }

    googleLogin() {
        // TODO: implement
        // this.store.dispatch(GoogleOauthActions.startGoogleLogin())
    }
    githubLogin() {
        this.store.dispatch(GithubOauthActions.startLogin())
    }
}
