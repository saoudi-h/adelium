import { Tag } from '@core/entity/evaluation/tag.entity'
import { createGenericSelectors } from '@store/generic/generic.selectors'
import { tagAdapter } from './tag.adapter'

export const TagSelectors = createGenericSelectors<Tag>(tagAdapter, 'tags')
