import { Tag } from '@core/entity/evaluation/tag.entity'
import { createGenericSelectors } from '@store/entities/generic/generic.selectors'
import { tagAdapter } from './tag.adapter'

export const TagSelectors = createGenericSelectors<Tag>(tagAdapter, 'tags')
