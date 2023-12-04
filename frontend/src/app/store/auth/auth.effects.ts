import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '@auth/services/auth.service'
import { NotificationService } from '@core/services/notification.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import * as AppActions from '@store/app/app.actions'
import * as AuthActions from '@store/auth/auth.actions'
import { of } from 'rxjs'
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators'
@Injectable()
export class AuthEffects {
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
                    this.router.navigate(['/login'])
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
                    console.log('authEffects : authSuccess$')
                    console.log('token', token.accessToken)
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
}
