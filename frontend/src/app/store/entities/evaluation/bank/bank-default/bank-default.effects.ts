import { Injectable } from '@angular/core'
import { BankDefault } from '@core/entity/evaluation/bank-default.entity'
import { Actions } from '@ngrx/effects'
import { GenericEffects } from '@store/generic/generic.effects'
import { BankDefaultActions } from './bank-default.actions'
import { BankDefaultService } from './bank-default.service'

@Injectable({ providedIn: 'root' })
export class BankDefaultEffects extends GenericEffects<BankDefault> {
    constructor(actions$: Actions, bankDefaultService: BankDefaultService) {
        super(actions$, bankDefaultService, BankDefaultActions, 'bankDefaults')
    }
}
