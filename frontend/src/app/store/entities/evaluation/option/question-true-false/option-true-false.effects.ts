import { Injectable } from '@angular/core'
import { OptionTrueFalse } from '@core/entity/evaluation/option-true-false.entity'
import { Actions } from '@ngrx/effects'
import { GenericEffects } from '@store/generic/generic.effects'
import { OptionTrueFalseActions } from './option-true-false.actions'
import { OptionTrueFalseService } from './option-true-false.service'

@Injectable({ providedIn: 'root' })
export class OptionTrueFalseEffects extends GenericEffects<OptionTrueFalse> {
    constructor(
        actions$: Actions,
        optionTrueFalseService: OptionTrueFalseService
    ) {
        super(
            actions$,
            optionTrueFalseService,
            OptionTrueFalseActions,
            'optionTrueFalses'
        )
    }
}
