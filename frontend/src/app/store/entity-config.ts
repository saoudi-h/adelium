/* eslint-disable @typescript-eslint/no-explicit-any */
import { RoleActions } from './role/role.actions'
import { UserActions } from './user/user.actions'

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
