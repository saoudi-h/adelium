import { Authority } from '@core/entity/auth/authority.entity'
import { createGenericSelectors } from '@store/entities/generic/generic.selectors'
import { authorityAdapter } from './authority.adapter'

export const AuthoritySelectors = createGenericSelectors<Authority>(
    authorityAdapter,
    'authorities'
)
