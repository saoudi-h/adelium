import { Role } from '@core/entity/auth/role.entity'
import { createGenericAdapter } from '@store/generic/generic.adapter'

export const roleAdapter = createGenericAdapter<Role>()
