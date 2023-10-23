import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Token } from '@core/dto/Token'
import { UserLogin } from '@core/dto/UserLogin'
import { UserToken } from '@core/dto/UserToken'
import { Role } from '@core/models/role'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { environment } from 'src/environments/environment.development'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `${environment.baseUrl}/auth`
  private token: Token | null = null
  private user: UserToken | null = null
  private redirectUrl: string | null = null

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable()

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.token = this.getToken()
    if (!this.isLoggedInSubject.value) return
    this.user = this.getUserFromToken()
    if (this.hasTokenExpired()) {
      this.refresh()
    }
  }

  getUserFromToken(): UserToken | null {
    if (!this.isLoggedIn()) return null
    const accessToken = this.getAccessToken()
    if (!accessToken) return null
    const userData = JSON.parse(atob(accessToken.split('.')[1])) as UserToken
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

  login(userLogin: UserLogin): Observable<Token | null> {
    console.log('userLogin : ', userLogin)
    console.log('isLoggedIn : ', this.isLoggedIn())
    console.log(this.user)
    if (this.isLoggedIn()) {
      // observable vide
      return of(null)
    }

    console.log('Not logged')
    const request = this.httpClient.post<Token>(`${this.url}/authenticate`, userLogin)

    request.subscribe({
      next: (token: Token) => {
        this.setToken(token)

        if (this.redirectUrl) {
          this.router.navigate([this.redirectUrl])
          this.redirectUrl = null
        } else {
          this.router.navigate(['/'])
        }
      },
      error: () => {
        throw new Error('La connexion a échoué')
      },
    })
    return request
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
    this.isLoggedInSubject.next(false)
    this.router.navigate(['/'])
  }

  validateRoles(roles: Role, method = 'any') {
    return false
  }

  withAuth() {
    if (!this.token || !this.user)
      throw new Error('The method should not be called on an unauthenticated user.')
  }
}
