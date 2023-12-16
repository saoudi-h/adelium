import { Role } from '@core/entity/role.entity'
import { createGenericAdapter } from '@store/generic/generic.adapter'

export const roleAdapter = createGenericAdapter<Role>()
