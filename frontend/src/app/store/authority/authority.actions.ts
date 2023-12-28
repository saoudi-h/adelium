import { Authority } from '@core/entity/auth/authority.entity'
import { createEntityActions } from '@store/generic/generic.actions'

export const AuthorityActions = createEntityActions<Authority>('Authority')
