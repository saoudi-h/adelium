import { Injectable } from '@angular/core'
import { Role } from '@core/entity/auth/role.entity'
import { NotificationService } from '@core/services/notification.service'
import { Actions } from '@ngrx/effects'
import { GenericEffects } from '@store/entities/generic/generic.effects'
import { RoleActions } from './role.actions'
import { RoleService } from './role.service'

@Injectable({ providedIn: 'root' })
export class RoleEffects extends GenericEffects<Role> {
    constructor(
        actions$: Actions,
        userService: RoleService,
        notificationService: NotificationService
    ) {
        super(actions$, userService, RoleActions, 'roles', notificationService)
    }
}
