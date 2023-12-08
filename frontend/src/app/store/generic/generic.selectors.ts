import { Identifiable } from '@core/entity/identifiable.interface'
import { EntityAdapter } from '@ngrx/entity'
import { createFeatureSelector, createSelector } from '@ngrx/store'
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
) {
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

export type EntitySelectors<T extends Identifiable> = ReturnType<
    typeof createGenericSelectors<T>
>
