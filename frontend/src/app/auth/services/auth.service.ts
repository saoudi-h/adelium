import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Token } from '@core/dto/Token'
import { UserLogin } from '@core/dto/UserLogin'
import { UserRegister } from '@core/dto/UserRegister'
import { UserToken } from '@core/dto/UserToken'
import { Role } from '@core/models/role'
import { BehaviorSubject, Observable, catchError, of, tap, throwError } from 'rxjs'
import { environment } from 'src/environments/environment.development'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private url = `${environment.baseUrl}/api/v1/auth`
    private token: Token | null = null
    private _user: UserToken | null = null
    public get user(): UserToken | null {
        return this._user
    }
    public set user(value: UserToken | null) {
        this._user = value
    }
    private redirectUrl: string | null = null

    /**
     * IsLoggedIn subject
     * */
    private isLoggedInSubject: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false)
    public isLoggedIn$: Observable<boolean> =
        this.isLoggedInSubject.asObservable()

    /**
     * User subject
     * */
    private userSubject: BehaviorSubject<UserToken | null> =
        new BehaviorSubject<UserToken | null>(null)
    public user$: Observable<UserToken | null> = this.userSubject.asObservable()

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) {
        this.token = this.getToken()
        if (this.isLoggedInSubject.value) this.updateUser()
    }

    private updateUser(): void {
        this._user = this.getUserFromToken()
        this.userSubject.next(this._user)
        if (this.hasTokenExpired()) {
            this.refresh()
        }
    }

    private getUserFromToken(): UserToken | null {
        if (!this.isLoggedIn()) return null
        const accessToken = this.getAccessToken()
        if (!accessToken) return null
        const userData = JSON.parse(
            atob(accessToken.split('.')[1])
        ) as UserToken
        return userData
    }
    getAccessToken() {
        return localStorage.getItem('accessToken')
    }
    getRefreshToken() {
        return localStorage.getItem('refreshToken')
    }
    getToken(): Token | null {
        const accessToken = this.getAccessToken()
        const refreshToken = this.getRefreshToken()

        if (!accessToken || !refreshToken) {
            this.isLoggedInSubject.next(false)
            return null
        }
        this.isLoggedInSubject.next(true)
        this.updateUser()
        return { accessToken, refreshToken }
    }

    hasTokenExpired(): boolean {
        this.withAuth()
        return this.user!.exp < Date.now() / 1000
    }

    setToken(token: Token) {
        this.isLoggedInSubject.next(true)
        localStorage.setItem('refreshToken', token.refreshToken)
        localStorage.setItem('accessToken', token.accessToken)
    }

    isLoggedIn(): boolean {
        return this.isLoggedInSubject.getValue()
    }
    register(userRegister: UserRegister): Observable<Token | null> {
        if (this.isLoggedIn()) {
            // observable vide
            return of(null)
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                accept: 'application/json',
            }),
        }
        const request = this.httpClient.post<Token>(
            `${this.url}/register`,
            userRegister,
            httpOptions
        )

        return request.pipe(
            tap(token => {
                this.handleLoginSucess(token)
            }),
            catchError(error => {
                // Propager l'erreur au lieu de la remplacer
                return throwError(() => error)
            })
        )
    }

    login(userLogin: UserLogin): Observable<Token | null> {
        if (this.isLoggedIn()) {
            // observable vide
            return of(null)
        }

        const request = this.httpClient.post<Token>(
            `${this.url}/login`,
            userLogin
        )

        return request.pipe(
            tap(token => {
                this.handleLoginSucess(token)
            }),
            catchError(error => {
                throw new Error('La connexion a échoué : ', error)
            })
        )
    }

    refresh() {
        this.withAuth()
        if (!this.isLoggedIn()) return
        return this.httpClient.get<Token>(`${this.url}/refresh`, {
            headers: { Authorization: `Bearer ${this.token!.refreshToken}` },
        })
    }

    logout() {
        this.token = null
        this.user = null
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        this.userSubject.next(null)
        this.isLoggedInSubject.next(false)
        this.router.navigate(['/'])
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validateRoles(roles: Role, _method = 'any') {
        return false
    }

    withAuth() {
        if (!this.isLoggedIn())
            throw new Error(
                'The method should not be called on an unauthenticated user.'
            )
    }

    handleLoginSucess(token: Token): void {
        this.setToken(token)
        this.updateUser()

        if (this.redirectUrl) {
            this.router.navigate([this.redirectUrl])
            this.redirectUrl = null
        } else {
            this.router.navigate(['/'])
        }
    }
}
