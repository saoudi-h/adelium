import { Identifiable } from '@core/entity/identifiable.interface'
import { EntityAdapter, EntityState } from '@ngrx/entity'
import { Action, ActionReducer, createReducer, on } from '@ngrx/store'
import { EntityActions } from './generic.actions'

export interface ExtendedState<T extends Identifiable> extends EntityState<T> {
    isLoading: boolean
    error: string | null
}

// Crée un reducer générique pour une entité de type T
export function createGenericReducer<T extends Identifiable>(
    adapter: EntityAdapter<T>,
    initialState: ExtendedState<T>,
    actions: EntityActions<T>
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
        on(actions.getItemsSuccess, (state, { items }) =>
            adapter.setAll(items, state)
        ),
        on(actions.getItemsFailure, (state, { error }): ExtendedState<T> => {
            return { ...state, error }
        }),
        on(actions.getItemByIdSuccess, (state, { item }) => {
            return adapter.upsertOne(item, state)
        }),

        on(actions.patchItemSuccess, (state, { item }) => {
            return adapter.updateOne({ id: item.id, changes: item }, state)
        }),

        on(actions.deleteSelectionSuccess, (state, { ids }) => {
            return adapter.removeMany(ids, state)
        }),

        on(actions.getPageSuccess, (state, { items, total }) => {
            return adapter.setAll(items, { ...state, total })
        })
    )
}
