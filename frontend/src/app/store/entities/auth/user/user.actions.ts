import { User } from '@core/entity/auth/user.entity'
import { createEntityActions } from '@store/entities/generic/generic.actions'

export const UserActions = createEntityActions<User>('User')
