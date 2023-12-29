import { Authority } from '@core/entity/auth/authority.entity'
import { createGenericAdapter } from '@store/generic/generic.adapter'

export const authorityAdapter = createGenericAdapter<Authority>()
