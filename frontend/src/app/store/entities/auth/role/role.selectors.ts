import { Role } from '@core/entity/auth/role.entity'
import { createGenericSelectors } from '@store/entities/generic/generic.selectors'
import { roleAdapter } from './role.adapter'

export const RoleSelectors = createGenericSelectors<Role>(roleAdapter, 'roles')
