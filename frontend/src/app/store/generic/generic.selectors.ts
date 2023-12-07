import { Identifiable } from '@core/entity/identifiable.interface'
import { Dictionary, EntityAdapter, EntityState } from '@ngrx/entity'
import {
    MemoizedSelector,
    createFeatureSelector,
    createSelector,
} from '@ngrx/store'
import { ExtendedState } from './generic.reducer'

/**
 * Creates generic selectors for an entity using an entity adapter and feature name.
 * @param entityAdapter - The entity adapter for the entity.
 * @param featureName - The name of the feature state.
 * @returns An object containing the generic selectors for the entity.
 */
export function createGenericSelectors<T extends Identifiable>(
    entityAdapter: EntityAdapter<T>,
    featureName: string
): BaseSelectors<T> {
    /**
     * Selects the feature state.
     */
    const selectEntityState =
        createFeatureSelector<ExtendedState<T>>(featureName)

    /**
     * Selects the loading state.
     * @returns True if the entity is loading, false otherwise.
     * */
    const selectIsLoading = createSelector(
        selectEntityState,
        state => state.isLoading
    )

    /**
     * Selects the error state.
     * @returns The error message if the entity has an error, null otherwise.
     */
    const selectError = createSelector(selectEntityState, state => state.error)

    /**
     * Selects all entities.
     */
    const { selectIds, selectEntities, selectAll, selectTotal } =
        entityAdapter.getSelectors(selectEntityState)

    /**
     * Selects an entity by its id.
     * @param id - The id of the entity to select.
     * @returns The entity with the given id.
     **/
    const selectEntityById = (id: number) =>
        createSelector(selectEntities, entities => entities[id])

    return {
        selectIds,
        selectEntities,
        selectAll,
        selectTotal,
        selectEntityById,
        selectIsLoading,
        selectError,
    }
}

export interface BaseSelectors<T extends Identifiable> {
    selectIds: MemoizedSelector<
        object,
        string[] | number[],
        (entityState: EntityState<T>) => string[] | number[]
    >
    selectEntities: MemoizedSelector<
        object,
        Dictionary<T>,
        (entityState: EntityState<T>) => Dictionary<T>
    >
    selectAll: MemoizedSelector<
        object,
        T[],
        (entityState: EntityState<T>) => T[]
    >
    selectTotal: MemoizedSelector<
        object,
        number,
        (entityState: EntityState<T>) => number
    >
    selectEntityById: (
        id: number
    ) => MemoizedSelector<
        object,
        T | undefined,
        (s1: Dictionary<T>) => T | undefined
    >
    selectIsLoading: MemoizedSelector<
        object,
        boolean,
        (s1: ExtendedState<T>) => boolean
    >
    selectError: MemoizedSelector<
        object,
        string | null,
        (s1: ExtendedState<T>) => string | null
    >
}
