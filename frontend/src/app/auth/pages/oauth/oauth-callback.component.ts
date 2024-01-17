import { CommonModule } from '@angular/common'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NotificationService } from '@core/services/notification.service'
import { Store } from '@ngrx/store'
import { providersMap } from '@store/auth/oauth2/providers-map'
import { Observable } from 'rxjs'
import { SvgOauthComponent } from './svg-oauth.component'

@Component({
    selector: '[oauth-callback]',
    templateUrl: './oauth-callback.component.html',
    imports: [CommonModule, SvgOauthComponent],
    standalone: true,
})
export class OauthCallbackComponent implements OnInit {
    provider: 'google' | 'github' = 'google'
    isLoading: boolean = true
    error$: Observable<any> | undefined
    constructor(
        private route: ActivatedRoute,
        private store: Store,
        private router: Router,
        private notificationService: NotificationService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.provider = params['provider']
            const providerConfig =
                providersMap[this.provider as keyof typeof providersMap]

            if (!providerConfig) {
                this.notificationService.error(
                    'Erreur de connexion',
                    "Une erreur est survenue lors de l'authentification. Veuillez réessayer plus tard."
                )
                this.isLoading = false
                this.goToLoginPage()
                return
            }
            if (providerConfig.receiveToken) {
                this.route.fragment.subscribe(fragment => {
                    const accessToken = fragment
                        ? new URLSearchParams(fragment).get('access_token')
                        : null
                    if (accessToken) {
                        this.store.dispatch(
                            providerConfig.actions.loginRedirectSuccess({
                                isToken: true,
                                code: accessToken,
                            })
                        )
                        this.error$ = this.store.select(
                            providerConfig.selectors.selectAuthError
                        )
                    }
                })
            } else {
                this.route.queryParams.subscribe(queryParams => {
                    const code = queryParams['code']
                    if (code) {
                        this.store.dispatch(
                            providerConfig.actions.loginRedirectSuccess({
                                isToken: false,
                                code,
                            })
                        )
                        this.error$ = this.store.select(
                            providerConfig.selectors.selectAuthError
                        )
                    } else if (queryParams['error']) {
                        this.notificationService.error(
                            'Erreur de connexion',
                            "Une erreur est survenue lors de l'authentification. Veuillez réessayer plus tard."
                        )
                        this.store.dispatch(
                            providerConfig.actions.loginRedirectFailure({
                                error: {
                                    error: queryParams['error'],
                                    errorDescription:
                                        queryParams['error_description'],
                                    errorUri: queryParams['error_uri'],
                                },
                            })
                        )
                        this.goToLoginPage()
                    } else {
                        this.goToLoginPage()
                    }
                })
            }
        })
    }

    goToLoginPage(): void {
        this.router.navigate(['/auth/login'])
    }
}
