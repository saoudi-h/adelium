import { User } from '@core/entity/auth/user.entity'
import { createGenericAdapter } from '@store/entities/generic/generic.adapter'

export const userAdapter = createGenericAdapter<User>()
