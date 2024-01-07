import { MediaBoolean } from '@core/entity/evaluation/media-boolean.entity'
import { createGenericSelectors } from '@store/generic/generic.selectors'
import { mediaBooleanAdapter } from './media-boolean.adapter'

export const MediaBooleanSelectors = createGenericSelectors<MediaBoolean>(
    mediaBooleanAdapter,
    'mediaBooleans'
)
