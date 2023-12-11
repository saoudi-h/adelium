import { Injectable } from '@angular/core'
import { RequestQueueService } from '@auth/services/request-queue.service'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { AppState } from '@reducers'
import * as AuthActions from '@store/auth/auth.actions'
import * as RequestQueueActions from '@store/request-queue/request-queue.actions'
import * as requestQueueSelectors from '@store/request-queue/request-queue.selectors'
import { of } from 'rxjs'
import { catchError, map, switchMap } from 'rxjs/operators'

@Injectable()
export class RequestQueueEffects {
    constructor(
        private actions$: Actions,
        private requestQueueService: RequestQueueService,
        private store: Store<AppState>
    ) {}

    processQueue$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.refreshTokenSuccess),
            concatLatestFrom(() =>
                this.store.select(requestQueueSelectors.selectRequestQueue)
            ),
            switchMap(([, queue]) =>
                this.requestQueueService.processQueue(queue).pipe(
                    map(() => RequestQueueActions.processQueue()),
                    catchError(error =>
                        of(RequestQueueActions.queueProcessingFailed({ error }))
                    )
                )
            )
        )
    })

    refreshTokenFailure$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.refreshTokenFailure),
            map(() => {
                return RequestQueueActions.clearQueue()
            })
        )
    })
}
