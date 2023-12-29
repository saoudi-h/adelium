import { User } from '@core/entity/auth/user.entity'
import { createEntityActions } from '@store/generic/generic.actions'

export const UserActions = createEntityActions<User>('User')
