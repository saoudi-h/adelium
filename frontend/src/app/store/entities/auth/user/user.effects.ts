import { Injectable } from '@angular/core'
import { User } from '@core/entity/auth/user.entity'
import { NotificationService } from '@core/services/notification.service'
import { Actions } from '@ngrx/effects'
import { GenericEffects } from '@store/entities/generic/generic.effects'
import { UserActions } from './user.actions'
import { UserService } from './user.service'

@Injectable({ providedIn: 'root' })
export class UserEffects extends GenericEffects<User> {
    constructor(
        actions$: Actions,
        userService: UserService,
        notificationService: NotificationService
    ) {
        super(actions$, userService, UserActions, 'users', notificationService)
    }
}
