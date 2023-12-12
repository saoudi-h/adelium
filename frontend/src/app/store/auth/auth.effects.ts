import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '@auth/services/auth.service'
import { NotificationService } from '@core/services/notification.service'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import * as AppActions from '@store/app/app.actions'
import * as AuthActions from '@store/auth/auth.actions'
import * as AuthSelectors from '@store/auth/auth.selectors'
import { of } from 'rxjs'
import {
    catchError,
    concatMap,
    exhaustMap,
    filter,
    map,
    switchMap,
    take,
    tap,
} from 'rxjs/operators'
import { environment } from 'src/environments/environment.development'
@Injectable()
export class AuthEffects {
    private maxRefreshAttempts = environment.maxRefreshAttempts

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private notificationService: NotificationService,
        private store: Store
    ) {}

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.login),
            switchMap(({ userLogin }) => {
                return this.authService.login(userLogin).pipe(
                    map(token => AuthActions.loginSuccess({ token })),
                    catchError(error => of(AuthActions.loginFailure({ error })))
                )
            })
        )
    })

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.logout),
            switchMap(() => {
                this.notificationService.reset()
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('refreshAttempts')
                this.authService.logout()
                this.router.navigate(['/auth/login'])
                return of(AuthActions.logoutSuccess())
            })
        )
    })

    authSuccess$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.loginSuccess),
                tap(({ token }) => {
                    if (!token) {
                        AuthActions.loginFailure({ error: 'No token' })
                        return
                    }
                    localStorage.setItem('accessToken', token.accessToken)
                    localStorage.setItem('refreshToken', token.refreshToken)
                    localStorage.setItem('refreshAttempts', '0')
                    this.router.navigate(['/'])

                    // Notifier l'utilisateur du succès de l'authentification
                    this.notificationService.success(
                        'Bienvenue',
                        'Authentication réussi!'
                    )
                })
            )
        },
        { dispatch: false }
    )

    authFailure$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.loginFailure),
                tap(({ error }) => {
                    console.log('authEffects : authFailure$')
                    console.log('error', error)
                    this.notificationService.error(
                        'Erreur',
                        "Erreur lors de l'authentification"
                    )
                })
            )
        },
        { dispatch: false }
    )

    registerSuccess$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.registerSuccess),
                map(({ token }) => AuthActions.loginSuccess({ token })),
                tap(() => {
                    this.router.navigate(['/'])

                    this.notificationService.success(
                        'Bienvenue!',
                        'Votre compte a été créé avec succès'
                    )
                })
            )
        },
        { dispatch: false }
    )

    checkSession$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AppActions.appInit),
            exhaustMap(() => {
                const accessToken = localStorage.getItem('accessToken')
                const refreshToken = localStorage.getItem('refreshToken')
                const refreshAttempts = localStorage.getItem('refreshAttempts')
                console.log('refreshAttempts', refreshAttempts)

                if (accessToken && refreshToken && refreshAttempts)
                    return of(
                        AuthActions.restoreSessionSuccess({
                            token: {
                                accessToken,
                                refreshToken,
                            },
                            refreshAttempts: parseInt(refreshAttempts),
                        })
                    )

                return of(AuthActions.restoreSessionFailure())
            })
        )
    })

    refreshToken$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.refreshToken),
            concatMap(action =>
                this.store.select(AuthSelectors.selectRefreshAttempts).pipe(
                    take(1),
                    tap(refreshAttempts => {
                        if (refreshAttempts) {
                            localStorage.setItem(
                                'refreshAttempts',
                                refreshAttempts.toString()
                            )
                        }
                    }),
                    map(() => action)
                )
            ),
            switchMap(() =>
                this.authService.refreshToken().pipe(
                    map(token => AuthActions.refreshTokenSuccess({ token })),
                    catchError(error =>
                        of(AuthActions.refreshTokenFailure({ error }))
                    )
                )
            )
        )
    })

    checkRefreshFailure$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.refreshTokenFailure),
                concatLatestFrom(() =>
                    this.store.select(AuthSelectors.selectRefreshAttempts)
                ),
                filter(
                    ([, refreshTokenAttempts]) =>
                        refreshTokenAttempts >= this.maxRefreshAttempts
                ),
                switchMap(() => [
                    AuthActions.logout(),
                    AuthActions.notifyLogoutAfterRefreshFailure(),
                ])
            )
        },
        { dispatch: true }
    )

    notifyLogoutAfterRefreshFailure$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.notifyLogoutAfterRefreshFailure),
                tap(() => {
                    this.notificationService.warning(
                        'Déconnexion',
                        'Déconnexion en raison de tentatives de rafraîchissement échouées.'
                    )
                })
            )
        },
        { dispatch: false }
    )
}
