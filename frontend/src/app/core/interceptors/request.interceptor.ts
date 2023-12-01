/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthService } from '@auth/services/auth.service'
import { Observable } from 'rxjs'

/**
 * Intercepts HTTP requests and adds an Authorization header with the access token if the user is logged in.
 * If the request URL does not include '/auth/refresh', the access token is added to the headers.
 */
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

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
        if (
            this.authService.isLoggedIn() &&
            !request.url.includes('/auth/refresh')
        ) {
            console.log(this.authService.getAccessToken())
            const newRequest = request.clone({
                headers: request.headers.set(
                    'Authorization',
                    `Bearer ${this.authService.getAccessToken()}`
                ),
            })
            return next.handle(newRequest)
        }
        return next.handle(request)
    }
}
