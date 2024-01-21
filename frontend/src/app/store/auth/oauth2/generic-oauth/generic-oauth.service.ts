import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Token } from '@core/dto/Token'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable()
export abstract class GenericOauthService {
    protected authServiceUrl = `${environment.baseUrl}${environment.authServiceUrl}`
    protected abstract loginUrl: string
    protected abstract clientId: string
    protected abstract redirectUrl: string
    protected abstract provider: string
    protected abstract scope: string
    protected abstract responseType: string | undefined

    constructor(
        protected http: HttpClient,
        protected router: Router
    ) {}

    getUrl(): string {
        return `${this.loginUrl}?client_id=${this.clientId}&redirect_uri=${this.redirectUrl}&scope=${this.scope}&response_type=${this.responseType}`
    }
    startLogin(): void {
        console.log('service.startLogin')
        console.log('this.getUrl() : ', this.getUrl())
        window.location.href = this.getUrl()
    }

    exchangeCodeForToken(code: string): Observable<Token> {
        const url = `${this.authServiceUrl}/oauth/token/code/${this.provider}`
        return this.http.post<Token>(url, code)
    }

    exchangeTokenForToken(code: string): Observable<Token> {
        const url = `${this.authServiceUrl}/oauth/token/token/${this.provider}`
        return this.http.post<Token>(url, code)
    }
}
