import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Token } from '@core/dto/Token'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment.development'

@Injectable()
export abstract class GenericOauthService {
    protected authServiceUrl = `${environment.baseUrl}${environment.authServiceUrl}`
    protected abstract loginUrl: string
    protected abstract clientId: string
    protected abstract redirectUrl: string
    protected abstract provider: string

    constructor(
        protected http: HttpClient,
        protected router: Router
    ) {}

    getUrl(): string {
        return `${this.loginUrl}?client_id=${this.clientId}&redirect_uri=${this.redirectUrl}&scope=user&response_type=code`
    }
    startLogin(): void {
        window.location.href = this.getUrl()
    }

    exchangeCodeForToken(code: string): Observable<Token> {
        const url = `${this.authServiceUrl}/oauth/token/${this.provider}`
        return this.http.post<Token>(url, code)
    }

    // // Obtenez le profil utilisateur
    // getUserProfile(): Observable<any> {
    //     const url = `${this.backendUrl}/oauth/user`
    //     return this.http.get<any>(url)
    // }
}
