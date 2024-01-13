import { AuthorityEffects } from './authority/authority.effects'
import { RoleEffects } from './role/role.effects'
import { UserEffects } from './user/user.effects'

export const UsersEffects = [UserEffects, RoleEffects, AuthorityEffects]
