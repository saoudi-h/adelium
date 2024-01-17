import { Injectable } from '@angular/core'
import { Authority } from '@core/entity/auth/authority.entity'
import { NotificationService } from '@core/services/notification.service'
import { Actions } from '@ngrx/effects'
import { GenericEffects } from '@store/entities/generic/generic.effects'
import { AuthorityActions } from './authority.actions'
import { AuthorityService } from './authority.service'

@Injectable({ providedIn: 'root' })
export class AuthorityEffects extends GenericEffects<Authority> {
    constructor(
        actions$: Actions,
        authorityService: AuthorityService,
        notificationService: NotificationService
    ) {
        super(
            actions$,
            authorityService,
            AuthorityActions,
            'authorities',
            notificationService
        )
    }
}
