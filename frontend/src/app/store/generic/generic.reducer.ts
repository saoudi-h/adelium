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
    pageIds: number[]
}

export interface ExtendedState<T extends Identifiable> extends EntityState<T> {
    paginationInfo: PaginationInfo
    relatedEntities: {
        [entityId: number]: { [relation: string]: number[] }
    }
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
        on(actions.addSelectionSuccess, (state: ExtendedState<T>, { items }) =>
            adapter.upsertMany(items, state)
        ),
        on(actions.updateItemSuccess, (state, { item }) =>
            adapter.updateOne({ id: item.id, changes: item }, state)
        ),
        on(actions.deleteItemSuccess, (state, { id }) => ({
            ...adapter.removeOne(id, state),
            paginationInfo: {
                ...state.paginationInfo,
                result: {
                    ...state.paginationInfo.result,
                    totalElements:
                        state.paginationInfo.result.totalElements - 1,
                },
            },
        })),
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
            return adapter.upsertMany(items, {
                ...state,
                paginationInfo: {
                    ...state.paginationInfo,
                    result: page.page,
                    pageIds: items.map(item => item.id),
                },
                isLoading: false,
            })
        }),
        on(
            actions.getRelatedEntitiesSuccess,
            (state, { id, relation, entities }) => {
                return {
                    ...state,
                    relatedEntities: {
                        ...state.relatedEntities,
                        [id]: {
                            ...state.relatedEntities[id],
                            [relation]: entities.map(entity => entity.id),
                        },
                    },
                }
            }
        ),
        on(
            actions.updateRelatedEntitiesSuccess,
            (state, { id, relation, relatedEntityIds }): ExtendedState<T> => {
                return {
                    ...state,
                    relatedEntities: {
                        ...state.relatedEntities,
                        [id]: {
                            ...state.relatedEntities[id],
                            [relation]: relatedEntityIds,
                        },
                    },
                }
            }
        ),
        on(
            actions.updatePaginationParams,
            (state, { page, size, sort }): ExtendedState<T> => {
                return {
                    ...state,
                    paginationInfo: {
                        ...state.paginationInfo,
                        params: {
                            ...state.paginationInfo.params,
                            page:
                                page !== undefined
                                    ? page
                                    : state.paginationInfo.params.page,
                            size:
                                size !== undefined
                                    ? size
                                    : state.paginationInfo.params.size,
                            sort: sort || state.paginationInfo.params.sort,
                        },
                    },
                }
            }
        ),

        on(actions.resetPaginationParams, (state): ExtendedState<T> => {
            return {
                ...state,
                paginationInfo: {
                    ...state.paginationInfo,
                    params: initialState.paginationInfo.params,
                },
            }
        })
    )
}
