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
import { Store } from '@ngrx/store'
import { AppState } from '@reducers'
import * as AuthActions from '@store/auth/auth.actions'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {
    constructor(
        private requestQueueService: RequestQueueService,
        private store: Store<AppState>
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(error => {
                if (
                    error instanceof HttpErrorResponse &&
                    error.status === 401
                ) {
                    this.requestQueueService.enqueueRequest(request, next)

                    this.store.dispatch(AuthActions.refreshToken())

                    return throwError(
                        () =>
                            new Error(
                                'La requête a été mise en attente en attendant le rafraîchissement du token'
                            )
                    )
                }
                return throwError(() => new Error(error))
            })
        )
    }
}
