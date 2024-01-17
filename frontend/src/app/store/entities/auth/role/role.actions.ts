import { Role } from '@core/entity/auth/role.entity'
import { createEntityActions } from '@store/entities/generic/generic.actions'

export const RoleActions = createEntityActions<Role>('Role')
