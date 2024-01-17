import { Tag } from '@core/entity/evaluation/tag.entity'
import { createGenericAdapter } from '@store/entities/generic/generic.adapter'

export const tagAdapter = createGenericAdapter<Tag>()
