import { Authority } from '@core/entity/authority.entity'
import { createGenericSelectors } from '@store/generic/generic.selectors'
import { authorityAdapter } from './authority.adapter'

export const AuthoritySelectors = createGenericSelectors<Authority>(
    authorityAdapter,
    'authorities'
)
