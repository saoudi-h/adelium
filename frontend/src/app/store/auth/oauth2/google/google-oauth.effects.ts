import { Injectable } from '@angular/core'
import { NotificationService } from '@core/services/notification.service'
import { Actions } from '@ngrx/effects'
import { GenericOauthEffects } from '../generic-oauth/generic-oauth.effects'
import { GoogleOauthActions } from './google-oauth.actions'
import { GoogleOauthService } from './google-oauth.service'

@Injectable({ providedIn: 'root' })
export class GoogleOauthEffects extends GenericOauthEffects {
    constructor(
        actions$: Actions,
        oauthService: GoogleOauthService,
        notificationService: NotificationService
    ) {
        super(actions$, oauthService, GoogleOauthActions, notificationService)
    }
}
