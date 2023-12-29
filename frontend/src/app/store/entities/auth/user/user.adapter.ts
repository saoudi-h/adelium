import { User } from '@core/entity/auth/user.entity'
import { createGenericAdapter } from '@store/generic/generic.adapter'

export const userAdapter = createGenericAdapter<User>()
