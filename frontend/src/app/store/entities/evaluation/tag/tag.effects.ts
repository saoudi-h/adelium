import { Injectable } from '@angular/core'
import { Tag } from '@core/entity/evaluation/tag.entity'
import { Actions } from '@ngrx/effects'
import { GenericEffects } from '@store/generic/generic.effects'
import { TagActions } from './tag.actions'
import { TagService } from './tag.service'

@Injectable({ providedIn: 'root' })
export class TagEffects extends GenericEffects<Tag> {
    constructor(actions$: Actions, tagService: TagService) {
        super(actions$, tagService, TagActions, 'tags')
    }
}
