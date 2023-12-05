import { User } from '@core/entity/user.entity'
import { createGenericAdapter } from '@store/generic/generic.adapter'

export const userAdapter = createGenericAdapter<User>()
