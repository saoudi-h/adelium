import { Role } from '@core/entity/role.entity'
import { createEntityActions } from '@store/generic/generic.actions'

export const RoleActions = createEntityActions<Role>('Role')
