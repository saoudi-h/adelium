import { Identifiable } from '@core/entity/identifiable.interface'
import { EntityAdapter, EntityState } from '@ngrx/entity'
import { Action, ActionReducer, createReducer, on } from '@ngrx/store'
import { EntityActions } from './generic.actions'

export interface SortCriterion {
    property: string
    direction: 'asc' | 'desc'
}
export interface PaginationParams {
    page: number
    size: number
    sort: SortCriterion[]
}
export interface PaginationResult {
    size: number
    totalElements: number
    totalPages: number
    number: number
}

export interface PaginationInfo {
    params: PaginationParams
    result: PaginationResult
}

export interface ExtendedState<T extends Identifiable> extends EntityState<T> {
    paginationInfo: PaginationInfo
    isLoading: boolean
    error: string | null
}

export function createGenericReducer<T extends Identifiable>(
    adapter: EntityAdapter<T>,
    initialState: ExtendedState<T>,
    actions: EntityActions<T>,
    entityType: string
): ActionReducer<ExtendedState<T>, Action> {
    return createReducer(
        initialState,
        on(actions.addItemSuccess, (state: ExtendedState<T>, { item }) =>
            adapter.addOne(item, state)
        ),
        on(actions.updateItemSuccess, (state, { item }) =>
            adapter.updateOne({ id: item.id, changes: item }, state)
        ),
        on(actions.deleteItemSuccess, (state, { id }) =>
            adapter.removeOne(id, state)
        ),
        on(actions.getItemByIdSuccess, (state, { item }) => {
            return adapter.upsertOne(item, state)
        }),

        on(actions.patchItemSuccess, (state, { item }) => {
            return adapter.updateOne({ id: item.id, changes: item }, state)
        }),

        on(actions.deleteSelectionSuccess, (state, { ids }) => {
            return adapter.removeMany(ids, state)
        }),

        on(actions.getPageSuccess, (state, { page }) => {
            const items = page._embedded[entityType]
            return adapter.setAll(items, {
                ...state,
                paginationInfo: {
                    ...state.paginationInfo,
                    result: page.page,
                },
                isLoading: false,
            })
        })
    )
}
