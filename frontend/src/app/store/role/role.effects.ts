import { Injectable } from '@angular/core'
import { Role } from '@core/entity/role.entity'
import { Actions } from '@ngrx/effects'
import { GenericEffects } from '@store/generic/generic.effects'
import { RoleActions } from './role.actions'
import { RoleService } from './role.service'

@Injectable({ providedIn: 'root' })
export class RoleEffects extends GenericEffects<Role> {
    constructor(actions$: Actions, userService: RoleService) {
        super(actions$, userService, RoleActions, 'roles')
    }
}
