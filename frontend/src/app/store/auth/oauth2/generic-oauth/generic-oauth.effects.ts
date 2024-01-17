import { Injectable } from '@angular/core'
import { NotificationService } from '@core/services/notification.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of } from 'rxjs'
import * as AuthActions from '../../auth.actions'
import { OauthActions } from './generic-oauth.actions'
import { GenericOauthService } from './generic-oauth.service'

@Injectable()
export abstract class GenericOauthEffects {
    constructor(
        protected actions$: Actions,
        protected oauthService: GenericOauthService,
        protected oauthActions: OauthActions,
        protected notificationService: NotificationService
    ) {}

    startLogin$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(this.oauthActions.startLogin),
                map(() => this.oauthService.startLogin())
            )
        },
        { dispatch: false }
    )

    loginRedirectSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.oauthActions.loginRedirectSuccess),
            map(({ code, isToken }) =>
                isToken
                    ? this.oauthActions.exchangeTokenForToken({ token: code })
                    : this.oauthActions.exchangeCodeForToken({ code })
            )
        )
    })

    exchangeCodeForToken$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.oauthActions.exchangeCodeForToken),
            mergeMap(({ code }) =>
                this.oauthService.exchangeCodeForToken(code).pipe(
                    map(token =>
                        this.oauthActions.exchangeCodeForTokenSuccess({ token })
                    ),
                    catchError(error =>
                        of(
                            this.oauthActions.exchangeCodeForTokenFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    })

    exchangeTokenForToken$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.oauthActions.exchangeTokenForToken),
            mergeMap(({ token }) =>
                this.oauthService.exchangeTokenForToken(token).pipe(
                    map(token =>
                        this.oauthActions.exchangeTokenForTokenSuccess({
                            token,
                        })
                    ),
                    catchError(error =>
                        of(
                            this.oauthActions.exchangeTokenForTokenFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    })

    tokenExchangeSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(
                this.oauthActions.exchangeTokenForTokenSuccess,
                this.oauthActions.exchangeCodeForTokenSuccess
            ),
            map(token => AuthActions.loginSuccess(token))
        )
    })
}
