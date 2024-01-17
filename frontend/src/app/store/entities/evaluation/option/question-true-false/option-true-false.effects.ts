import { Injectable } from '@angular/core'
import { OptionTrueFalse } from '@core/entity/evaluation/option-true-false.entity'
import { NotificationService } from '@core/services/notification.service'
import { Actions } from '@ngrx/effects'
import { GenericEffects } from '@store/entities/generic/generic.effects'
import { OptionTrueFalseActions } from './option-true-false.actions'
import { OptionTrueFalseService } from './option-true-false.service'

@Injectable({ providedIn: 'root' })
export class OptionTrueFalseEffects extends GenericEffects<OptionTrueFalse> {
    constructor(
        actions$: Actions,
        optionTrueFalseService: OptionTrueFalseService,
        notificationService: NotificationService
    ) {
        super(
            actions$,
            optionTrueFalseService,
            OptionTrueFalseActions,
            'optionTrueFalses',
            notificationService
        )
    }
}
