import { Injectable } from '@angular/core'
import { NotificationService } from '@core/services/notification.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, of } from 'rxjs'
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
            map(({ code }) => this.oauthActions.exchangeCodeForToken({ code }))
        )
    })

    exchangeCodeForToken$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.oauthActions.exchangeCodeForToken),
            mergeMap(({ code }) =>
                this.oauthService.exchangeCodeForToken(code).pipe(
                    map(token =>
                        this.oauthActions.tokenExchangeSuccess({ token })
                    ),
                    catchError(error =>
                        of(
                            this.oauthActions.tokenExchangeFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    })
}
