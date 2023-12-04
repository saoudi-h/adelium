/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import * as AuthSelectors from '@store/auth/auth.selectors'
import { Observable } from 'rxjs'
import { first, mergeMap } from 'rxjs/operators'

/**
 * Intercepts HTTP requests and adds an Authorization header with the access token if the user is logged in.
 * If the request URL does not include '/auth/refresh', the access token is added to the headers.
 */
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private store: Store) {}

    /**
     * intercept is called before the HTTP request is sent to the server.
     * If the user is logged in, the access token is added to the headers.
     * If the request URL does not include '/auth/refresh', the access token is added to the headers.
     * If the user is not logged in, the request is sent as is.
     * @param request - The HTTP request to be intercepted.
     * @param next - The next HTTP handler in the chain.
     * @returns An observable of the HTTP event.
     */
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return this.store.select(AuthSelectors.selectAccessToken).pipe(
            first(),
            mergeMap(token => {
                const authReq = token
                    ? request.clone({
                          setHeaders: { Authorization: 'Bearer ' + token },
                      })
                    : request
                return next.handle(authReq)
            })
        )
    }
}
