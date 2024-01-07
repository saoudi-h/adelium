import { MediaBoolean } from '@core/entity/evaluation/media-boolean.entity'
import { createEntityActions } from '@store/generic/generic.actions'

export const MediaBooleanActions =
    createEntityActions<MediaBoolean>('Media-boolean')
