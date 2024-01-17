import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment.development'
import { GenericOauthService } from '../generic-oauth/generic-oauth.service'

@Injectable({
    providedIn: 'root',
})
export class GithubOauthService extends GenericOauthService {
    protected loginUrl = environment.githubLoginUrl
    protected clientId = environment.githubClientId
    protected redirectUrl = environment.githubRedirectUrl
    protected provider = 'github'
    protected scope = 'user:email'
    protected responseType = 'code'

    constructor(http: HttpClient, router: Router) {
        super(http, router)
    }
}
