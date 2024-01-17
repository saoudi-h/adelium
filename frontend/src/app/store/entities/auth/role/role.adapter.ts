import { Role } from '@core/entity/auth/role.entity'
import { createGenericAdapter } from '@store/entities/generic/generic.adapter'

export const roleAdapter = createGenericAdapter<Role>()
