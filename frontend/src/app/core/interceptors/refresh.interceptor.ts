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
import { AppState } from '@reducers'
import * as AuthActions from '@store/auth/auth.actions'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
    private readonly refreshEndpoint = '/auth/refresh'

    constructor(
        private requestQueueService: RequestQueueService,
        private store: Store<AppState>,
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
                        this.requestQueueService.enqueueRequest(request, next)
                        this.store.dispatch(AuthActions.refreshToken())
                        return throwError(
                            () =>
                                new Error(
                                    'La requête a été mise en attente en attendant le rafraîchissement du token'
                                )
                        )
                    } else {
                        this.store.dispatch(AuthActions.logout())
                        this.notification.error(
                            'Session expirée',
                            'Votre session a expiré, veuillez vous reconnecter'
                        )
                    }
                }
                return throwError(() => error)
            })
        )
    }
}
