import { MediaText } from '@core/entity/evaluation/media-text.entity'
import { createGenericSelectors } from '@store/generic/generic.selectors'
import { mediaTextAdapter } from './media-text.adapter'

export const MediaTextSelectors = createGenericSelectors<MediaText>(
    mediaTextAdapter,
    'mediaTexts'
)
