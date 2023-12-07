import { User } from '@core/entity/user.entity'
import { createGenericSelectors } from '@store/generic/generic.selectors'
import { userAdapter } from './user.adapter'

export const UserSelectors = createGenericSelectors<User>(userAdapter, 'users')