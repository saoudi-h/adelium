import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Role } from '@core/models/role'
import { Token } from '@core/models/token'
import { User } from '@core/models/user'
import { environment } from 'src/environments/environment.development'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `${environment.baseUrl}/auth-service`
  private loggedIn = false
  private token: Token | null = null
  private user: User | null = null
  private redirectUrl: string | null = null

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.token = this.getTokenFromLocalStorage()
    this.user = this.getUserFromToken()
    if (this.hasTokenExpired()) {
      this.refresh()
    }
  }

  getUserFromToken(): User | null {
    if (!this.token) {
      return null
    }
    return User.fromToken(JSON.parse(atob(this.token.accessToken.split('.')[1])))
  }

  getTokenFromLocalStorage(): Token | null {
    const accessToken: string | null = localStorage.getItem('accessToken')
    const refreshToken: string | null = localStorage.getItem('refreshToken')

    if (!accessToken || !refreshToken) {
      this.loggedIn = false
      return null
    }
    this.loggedIn = true
    return new Token(accessToken, refreshToken)
  }

  hasTokenExpired(): boolean {
    this.withAuth()
    return this.user!.expireAt < Date.now() / 1000
  }

  setToken(token: Token) {
    this.token = token
    this.loggedIn = true
    this.saveToken()
    this.user = this.getUserFromToken()
  }

  saveToken() {
    this.withAuth()
    localStorage.setItem('refreshToken', this.token!.refreshToken)
    localStorage.setItem('accessToken', this.token!.accessToken)
  }

  isLoggedIn(): boolean {
    return this.loggedIn
  }

  login(user: User) {
    if (this.loggedIn) return
    const request = this.httpClient.post<Token>(`${this.url}/login`, user)

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
        throw new Error()
      },
    })
  }

  refresh() {
    this.withAuth()
    return this.httpClient.get<Token>(`${this.url}/refresh`, {
      headers: { Authorization: `Bearer ${this.token!.refreshToken}` },
    })
  }

  logout() {
    this.token = null
    this.user = null
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
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
