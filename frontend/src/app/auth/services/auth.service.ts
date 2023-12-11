import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Token } from '@core/dto/Token'
import { UserLogin } from '@core/dto/UserLogin'
import { UserRegister } from '@core/dto/UserRegister'
import { Store } from '@ngrx/store'
import * as AuthActions from '@store/auth/auth.actions'
import { Observable, catchError, switchMap, throwError } from 'rxjs'
import { environment } from 'src/environments/environment.development'
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private url = `${environment.baseUrl}/api/v1/auth`
    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private store: Store
    ) {}

    login(userLogin: UserLogin): Observable<Token> {
        return this.httpClient.post<Token>(`${this.url}/auth/login`, userLogin)
    }

    logout(): Observable<void> {
        return this.httpClient.post<void>(`${this.url}/auth/logout`, {})
    }

    register(userRegister: UserRegister): Observable<Token> {
        return this.httpClient
            .post<Token>(`${this.url}/auth/register`, userRegister)
            .pipe(
                switchMap(token => {
                    if (token) {
                        this.store.dispatch(
                            AuthActions.registerSuccess({ token })
                        )
                        return [token]
                    } else {
                        this.store.dispatch(
                            AuthActions.registerFailure({
                                error: 'No token received',
                            })
                        )
                        return throwError(() => new Error('No token received'))
                    }
                }),
                catchError(error => {
                    this.store.dispatch(AuthActions.registerFailure({ error }))
                    return throwError(() => new Error("L'inscription a échoué"))
                })
            )
    }

    refreshToken(): Observable<Token> {
        return this.httpClient.post<Token>(`${this.url}/auth/refresh`, {})
    }
}
