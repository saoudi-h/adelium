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
    exhaustMap,
    filter,
    map,
    switchMap,
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

    logout$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(AuthActions.logout),
                tap(() => {
                    localStorage.removeItem('accessToken')
                    localStorage.removeItem('refreshToken')
                    this.authService.logout()
                    this.notificationService.reset()
                    this.router.navigate(['/auth/login'])
                })
            )
        },
        { dispatch: false }
    )

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
                console.log('accessToken', accessToken)
                console.log('refreshToken', refreshToken)
                if (accessToken && refreshToken)
                    return of(
                        AuthActions.restoreSessionSuccess({
                            token: { accessToken, refreshToken },
                        })
                    )

                return of(AuthActions.restoreSessionFailure())
            })
        )
    })

    refreshToken$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.refreshToken),
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

    checkRefreshFailure$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.refreshTokenFailure),
            concatLatestFrom(() =>
                this.store.select(AuthSelectors.selectRefreshAttempts)
            ),
            filter(
                ([, refreshAttempts]) =>
                    refreshAttempts >= this.maxRefreshAttempts
            ),
            switchMap(() => {
                console.log("L'utilisateur n'a pas pu être authentifié")
                return of(AuthActions.logout())
            })
        )
    })
}
