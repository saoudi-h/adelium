import { take } from 'rxjs'
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { RequestQueueService } from '@auth/services/request-queue.service'
import { NotificationService } from '@core/services/notification.service'
import { Store } from '@ngrx/store'
import * as AuthActions from '@store/auth/auth.actions'
import * as AuthSelectors from '@store/auth/auth.selectors'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
    private readonly refreshEndpoint = '/auth/refresh'

    constructor(
        private requestQueueService: RequestQueueService,
        private store: Store,
        private notification: NotificationService
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    if (!request.url.endsWith(this.refreshEndpoint)) {
                        this.store.select(AuthSelectors.selectIsLoggedIn).pipe(
                            take(1),
                            map(isLoggedIn => {
                                if (isLoggedIn) {
                                    this.requestQueueService.enqueueRequest(
                                        request,
                                        next
                                    )
                                    this.store.dispatch(
                                        AuthActions.refreshToken()
                                    )
                                    return throwError(
                                        () =>
                                            new Error(
                                                'La requête a été mise en attente en attendant le rafraîchissement du token'
                                            )
                                    )
                                }
                                return null
                            }),
                            catchError(() => throwError(() => error))
                        )
                    } else {
                        this.store.select(AuthSelectors.selectIsLoggedIn).pipe(
                            take(1),
                            map(isLoggedIn => {
                                if (isLoggedIn) {
                                    this.requestQueueService.clearQueue()
                                    this.store.dispatch(AuthActions.logout())
                                    this.notification.error(
                                        'Session expirée',
                                        'Votre session a expiré. Veuillez vous reconnecter.'
                                    )
                                }
                            }),
                            catchError(() => throwError(() => error))
                        )
                    }
                }
                return throwError(() => error)
            })
        )
    }
}
