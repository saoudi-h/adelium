import { Injectable } from '@angular/core'
import { OptionMcq } from '@core/entity/evaluation/option-mcq.entity'
import { Actions } from '@ngrx/effects'
import { GenericEffects } from '@store/generic/generic.effects'
import { OptionMcqActions } from './option-mcq.actions'
import { OptionMcqService } from './option-mcq.service'

@Injectable({ providedIn: 'root' })
export class OptionMcqEffects extends GenericEffects<OptionMcq> {
    constructor(actions$: Actions, optionMcqService: OptionMcqService) {
        super(actions$, optionMcqService, OptionMcqActions, 'optionMcqs')
    }
}
