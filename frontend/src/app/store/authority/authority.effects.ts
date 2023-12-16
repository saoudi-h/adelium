import { Injectable } from '@angular/core'
import { Authority } from '@core/entity/authority.entity'
import { Actions } from '@ngrx/effects'
import { GenericEffects } from '@store/generic/generic.effects'
import { AuthorityActions } from './authority.actions'
import { AuthorityService } from './authority.service'

@Injectable({ providedIn: 'root' })
export class AuthorityEffects extends GenericEffects<Authority> {
    constructor(actions$: Actions, authorityService: AuthorityService) {
        super(actions$, authorityService, AuthorityActions, 'authorities')
    }
}
