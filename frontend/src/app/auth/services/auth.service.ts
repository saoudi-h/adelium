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

    // public get isLoggedIn(): boolean {
    //     return this.authState.isLoggedIn
    // }

    // public get isAdmin(): boolean {
    //     return this.authState.user?.authorities.includes('ROLE_ADMIN') ?? false
    // }

    // public get currentUser(): UserToken | null {
    //     return this.authState.user
    // }

    // public get accessToken(): string | null {
    //     return this.authState.token?.accessToken ?? null
    // }
    // public get refreshToken(): string | null {
    //     return this.authState.token?.refreshToken ?? null
    // }

    login(userLogin: UserLogin): Observable<Token> {
        return this.httpClient.post<Token>(`${this.url}/login`, userLogin).pipe(
            switchMap(token => {
                if (token) {
                    this.store.dispatch(AuthActions.loginSuccess({ token }))
                    return [token]
                } else {
                    this.store.dispatch(
                        AuthActions.loginFailure({ error: 'No token received' })
                    )
                    return throwError(() => new Error('No token received'))
                }
            }),
            catchError(error => {
                this.store.dispatch(AuthActions.loginFailure({ error }))
                return throwError(() => new Error('La connexion a échoué'))
            })
        )
    }

    logout(): void {
        this.store.dispatch(AuthActions.logout())
    }

    register(userRegister: UserRegister): Observable<Token> {
        return this.httpClient
            .post<Token>(`${this.url}/register`, userRegister)
            .pipe(
                switchMap(token => {
                    if (token) {
                        this.store.dispatch(
                            AuthActions.registerSuccess({ token })
                        )
                        return [token]
                    } else {
                        // Dispatcher l'échec de l'inscription et émettre une erreur
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
}
