import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment.development'
import { GenericOauthService } from '../generic-oauth/generic-oauth.service'

@Injectable({
    providedIn: 'root',
})
export class GoogleOauthService extends GenericOauthService {
    protected loginUrl = environment.googleLoginUrl
    protected clientId = environment.googleClientId
    protected redirectUrl = environment.googleRedirectUrl
    protected provider = 'google'
    protected scope = environment.googleScope
    protected responseType = 'token'

    constructor(http: HttpClient, router: Router) {
        super(http, router)
    }
}
