import { Tag } from '@core/entity/evaluation/tag.entity'
import { createEntityActions } from '@store/entities/generic/generic.actions'

export const TagActions = createEntityActions<Tag>('Tag')
