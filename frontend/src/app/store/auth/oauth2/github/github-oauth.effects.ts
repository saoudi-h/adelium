import { Injectable } from '@angular/core'
import { NotificationService } from '@core/services/notification.service'
import { Actions } from '@ngrx/effects'
import { GenericOauthEffects } from '../generic-oauth/generic-oauth.effects'
import { GithubOauthActions } from './github-oauth.actions'
import { GithubOauthService } from './github-oauth.service'

@Injectable({ providedIn: 'root' })
export class GithubOauthEffects extends GenericOauthEffects {
    constructor(
        actions$: Actions,
        oauthService: GithubOauthService,
        notificationService: NotificationService
    ) {
        super(actions$, oauthService, GithubOauthActions, notificationService)
    }
}
