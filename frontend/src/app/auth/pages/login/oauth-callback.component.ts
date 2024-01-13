import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { NotificationService } from '@core/services/notification.service'
import { Store } from '@ngrx/store'
import { providersMap } from '@store/auth/oauth2/providers-map'

@Component({
    selector: '[oauth-callback]',
    template: `<div>oauth page</div>`,
    standalone: true,
})
export class OauthCallbackComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private store: Store,
        private router: Router,
        private notificationService: NotificationService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const provider: string = params['provider']
            const actions =
                providersMap[provider as keyof typeof providersMap]?.actions

            if (!actions) {
                this.notificationService.error(
                    'Erreur de connexion',
                    "Une erreur est survenue lors de l'authentification. Veuillez réessayer plus tard."
                )
                this.goToLoginPage()
                return
            }

            this.route.queryParams.subscribe(queryParams => {
                const code = queryParams['code']
                if (code) {
                    console.log('Provider:', provider)
                    console.log('OAuth2 Code:', code)
                    this.store.dispatch(actions.loginRedirectSuccess({ code }))
                } else if (queryParams['error']) {
                    this.notificationService.error(
                        'Erreur de connexion',
                        "Une erreur est survenue lors de l'authentification. Veuillez réessayer plus tard."
                    )
                    this.store.dispatch(
                        actions.loginRedirectFailure({
                            error: {
                                error: queryParams['error'],
                                errorDescription:
                                    queryParams['error_description'],
                                errorUri: queryParams['error_uri'],
                            },
                        })
                    )
                }
            })
        })
    }

    goToLoginPage(): void {
        this.router.navigate(['/auth/login'])
    }
}
