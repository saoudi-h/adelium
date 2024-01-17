import { Injectable } from '@angular/core'
import { OptionMcq } from '@core/entity/evaluation/option-mcq.entity'
import { NotificationService } from '@core/services/notification.service'
import { Actions } from '@ngrx/effects'
import { GenericEffects } from '@store/entities/generic/generic.effects'
import { OptionMcqActions } from './option-mcq.actions'
import { OptionMcqService } from './option-mcq.service'

@Injectable({ providedIn: 'root' })
export class OptionMcqEffects extends GenericEffects<OptionMcq> {
    constructor(
        actions$: Actions,
        optionMcqService: OptionMcqService,
        notificationService: NotificationService
    ) {
        super(
            actions$,
            optionMcqService,
            OptionMcqActions,
            'optionMcqs',
            notificationService
        )
    }
}
