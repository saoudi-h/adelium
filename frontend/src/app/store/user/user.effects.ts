import { Injectable } from '@angular/core'
import { User } from '@core/entity/user.entity'
import { Actions } from '@ngrx/effects'
import { GenericEffects } from '@store/generic/generic.effects'
import { UserActions } from './user.actions'
import { UserService } from './user.service'

@Injectable({ providedIn: 'root' })
export class UserEffects extends GenericEffects<User> {
    constructor(actions$: Actions, userService: UserService) {
        super(actions$, userService, UserActions, 'users')
    }
}
