/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store } from '@ngrx/store'
import { EntityActions } from '@store/generic/generic.actions'
import { PaginationParams } from '@store/generic/generic.reducer'
import { EntitySelectors } from '@store/generic/generic.selectors'
import { map, switchMap } from 'rxjs'
import { Identifiable } from './../../core/entity/identifiable.interface'

/**
 * Creates dynamic options for a form utility.
 * @template T - The type of the main entity.
 * @template R - The type of the related entity.
 * @param {Store} store - The Redux store.
 * @param {EntitySelectors<T>} selectors - The selectors for the main entity.
 * @param {EntityActions<T>} actions - The actions for the main entity.
 * @param {EntitySelectors<R>} relatedSelectors - The selectors for the related entity.
 * @param {EntityActions<R>} relatedActions - The actions for the related entity.
 * @param {string} label - The label property of the related entity.
 * @param {string} relation - The relation between the main entity and the related entity.
 * @returns {Object} - An object containing utility functions for creating dynamic options.
 */
export const createDynamicOptions = <
    T extends Identifiable,
    R extends Identifiable,
>(
    store: Store,
    selectors: EntitySelectors<T>,
    actions: EntityActions<T>,
    relatedSelectors: EntitySelectors<R>,
    relatedActions: EntityActions<R>,
    label: string,
    relation: string
) => {
    return {
        all: () =>
            store.select(relatedSelectors.selectAll).pipe(
                map(entities =>
                    entities.map(entity => ({
                        label: entity[label],
                        value: entity.id,
                    }))
                )
            ),
        getNextPage: (params: PaginationParams) => {
            return store.dispatch(relatedActions.getPage({ params: params }))
        },
        getInitialById: (id: number) => {
            store.dispatch(
                actions.getRelatedEntities({
                    id: id,
                    relation: relation,
                })
            )

            return store
                .select(
                    selectors.selectRelatedEntities({
                        id: id,
                        relation: relation,
                    })
                )
                .pipe(
                    switchMap(id =>
                        store.select(relatedSelectors.selectAll).pipe(
                            map(entities =>
                                entities
                                    .filter(entity =>
                                        id ? id.includes(entity.id) : false
                                    )
                                    .map(entity => ({
                                        label: entity[label],
                                        value: entity.id,
                                    }))
                            )
                        )
                    )
                )
        },
        paginationResult: () =>
            store.select(relatedSelectors.selectPaginationResult),
        setRelations: (
            id: number,
            relation: string,
            relatedEntityIds: number[]
        ) => {
            store.dispatch(
                actions.updateRelatedEntities({
                    id,
                    relation,
                    relatedEntityIds,
                })
            )
        },
    }
}
