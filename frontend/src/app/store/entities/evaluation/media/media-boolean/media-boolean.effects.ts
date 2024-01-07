import { Injectable } from '@angular/core'
import { MediaBoolean } from '@core/entity/evaluation/media-boolean.entity'
import { Actions } from '@ngrx/effects'
import { GenericEffects } from '@store/generic/generic.effects'
import { MediaBooleanActions } from './media-boolean.actions'
import { MediaBooleanService } from './media-boolean.service'

@Injectable({ providedIn: 'root' })
export class MediaBooleanEffects extends GenericEffects<MediaBoolean> {
    constructor(actions$: Actions, mediaBooleanService: MediaBooleanService) {
        super(
            actions$,
            mediaBooleanService,
            MediaBooleanActions,
            'mediaBooleans'
        )
    }
}
