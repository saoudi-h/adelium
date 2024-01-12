import { Injectable } from '@angular/core'
import { MediaText } from '@core/entity/evaluation/media-text.entity'
import { NotificationService } from '@core/services/notification.service'
import { Actions } from '@ngrx/effects'
import { GenericEffects } from '@store/generic/generic.effects'
import { MediaTextActions } from './media-text.actions'
import { MediaTextService } from './media-text.service'

@Injectable({ providedIn: 'root' })
export class MediaTextEffects extends GenericEffects<MediaText> {
    constructor(
        actions$: Actions,
        mediaTextService: MediaTextService,
        notificationService: NotificationService
    ) {
        super(
            actions$,
            mediaTextService,
            MediaTextActions,
            'mediaTexts',
            notificationService
        )
    }
}
