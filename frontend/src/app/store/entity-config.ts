/* eslint-disable @typescript-eslint/no-explicit-any */
import { RoleActions } from './entities/auth/role/role.actions'
import { UserActions } from './entities/auth/user/user.actions'

export const entityConfig: { [key: string]: { actions: any; relations: any } } =
    {
        users: {
            actions: UserActions,
            relations: {
                roles: { type: 'manyToMany', partialUrl: 'roles' },
            },
        },
        roles: {
            actions: RoleActions,
            relations: {
                roles: { type: 'manyToMany', partialUrl: 'users' },
            },
        },
    }
