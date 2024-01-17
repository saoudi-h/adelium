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

    /**
     * Selects the pagination parameters.
     */
    const selectPaginationParams = createSelector(
        selectEntityState,
        state => state.paginationInfo.params
    )

    /**
     * Selects the pagination results.
     */
    const selectPaginationResult = createSelector(
        selectEntityState,
        state => state.paginationInfo.result
    )

    /**
     * Selects the related entities.
     * @param entityType - The type of the related entities.
     * @returns The related entities.
     */

    const selectRelatedEntities = ({
        id,
        relation,
    }: {
        id: number
        relation: string
    }) =>
        createSelector(selectEntityState, state => {
            return state.relatedEntities[id]?.[relation]
        })

    const selectRelatedEntity = ({
        id,
        relation,
    }: {
        id: number
        relation: string
    }) =>
        createSelector(selectEntityState, state => {
            return state.relatedEntity[id]?.[relation]
        })

    const selectCurrentPage = createSelector(selectEntityState, state => {
        return state.paginationInfo.pageIds
            .map(id => state.entities[id])
            .filter((entity): entity is T => entity !== undefined)
    })

    const selectSelection = (ids: number[]) =>
        createSelector(selectAll, entities => {
            return entities.filter(entity => ids.includes(entity.id))
        })

    const selectRelatedEntitiesLoaded = (id: number, relation: string) =>
        createSelector(selectEntityState, state => {
            const related = state.relatedEntities[id]
            return related && related[relation] ? related[relation] : null
        })

    const selectRelatedEntityLoaded = (id: number, relation: string) =>
        createSelector(selectEntityState, state => {
            const related = state.relatedEntity[id]
            return related && related[relation] ? related[relation] : null
        })

    const selectTransactionStatus = (transactionId: string) =>
        createSelector(selectEntityState, state => {
            return {
                status: state.transactions[transactionId],
            }
        })

    return {
        selectIds,
        selectEntities,
        selectAll,
        selectCurrentPage,
        selectTotal,
        selectEntityById,
        selectPaginationParams,
        selectPaginationResult,
        selectIsLoading,
        selectError,
        selectRelatedEntities,
        selectRelatedEntity,
        selectSelection,
        selectRelatedEntitiesLoaded,
        selectRelatedEntityLoaded,
        selectTransactionStatus,
    }
}

export type EntitySelectors<T extends Identifiable> = ReturnType<
    typeof createGenericSelectors<T>
>
