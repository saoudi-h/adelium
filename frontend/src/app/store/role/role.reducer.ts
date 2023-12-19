import { Role } from '@core/entity/role.entity'
import {
    ExtendedState,
    createGenericReducer,
} from '@store/generic/generic.reducer'
import { RoleActions } from './role.actions'
import { roleAdapter } from './role.adapter'

export interface RoleState extends ExtendedState<Role> {
    relatedEntities: {
        [id: number]: { users?: number[] }
    }
}

export const initialState: RoleState = roleAdapter.getInitialState({
    paginationInfo: {
        params: {
            page: 0,
            size: 20,
            sort: [],
        },
        result: {
            size: 0,
            totalElements: 0,
            totalPages: 0,
            number: 0,
        },
        pageIds: [],
    },
    relatedEntities: {},
    isLoading: false,
    error: null,
})

export const roleReducer = createGenericReducer<Role>(
    roleAdapter,
    initialState,
    RoleActions,
    'roles'
)
