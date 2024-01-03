/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store } from '@ngrx/store'
import { EntityActions } from '@store/generic/generic.actions'
import {
    PaginationParams,
    PaginationResult,
} from '@store/generic/generic.reducer'
import { EntitySelectors } from '@store/generic/generic.selectors'
import { Observable, map, switchMap } from 'rxjs'
import { Identifiable } from './../../core/entity/identifiable.interface'

export interface DynamicOptions {
    all: () => Observable<
        Array<{ label: string; value: any; disabled?: boolean }>
    >
    getNextPage: (params: PaginationParams) => void
    getInitialsById?: (
        id: number
    ) => Observable<{ label: string; value: any; disabled?: boolean }[]>

    getInitialById?: (
        id: number
    ) => Observable<{ label: string; value: any; disabled?: boolean }>
    paginationResult: () => Observable<PaginationResult>
    setRelations?: (
        id: number,
        relation: string,
        relatedEntityIds: number[]
    ) => void
    update?: (item: any, transactionId: string) => void
    display?: (id: number) => Observable<string | string[]>
}

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
export const createMultiDynamicOptions = <
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
): DynamicOptions => {
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
        getInitialsById: (id: number) => {
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
        display: (id: number) => {
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
                    switchMap(ids =>
                        store
                            .select(relatedSelectors.selectAll)
                            .pipe(
                                map(entities =>
                                    entities
                                        .filter(entity =>
                                            ids
                                                ? ids.includes(entity.id)
                                                : false
                                        )
                                        .map(entity => entity[label])
                                )
                            )
                    )
                )
        },
    }
}

/**
 * Creates dynamic options for a form utility.
 * @template R - The type of the related entity.
 * @param {Store} store - The Redux store.
 * @param {EntitySelectors<R>} relatedSelectors - The selectors for the related entity.
 * @param {EntityActions<R>} relatedActions - The actions for the related entity.
 * @param {string} label - The label property of the related entity.
 * @returns {Object} - An object containing utility functions for creating dynamic options.
 */
export const createDynamicOptions = <R extends Identifiable>(
    store: Store,
    relatedSelectors: EntitySelectors<R>,
    relatedActions: EntityActions<R>,
    label: string
): DynamicOptions => {
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
        getInitialById: (id: number) => {
            store.dispatch(
                relatedActions.getItemById({
                    id: id,
                })
            )

            return store.select(relatedSelectors.selectEntityById(id)).pipe(
                map(entity => {
                    if (entity && entity[label]) {
                        return {
                            label: entity[label] as string,
                            value: entity!.id,
                        }
                    } else {
                        return {
                            label: '',
                            value: 0,
                        }
                    }
                })
            )
        },
        getNextPage: (params: PaginationParams) => {
            return store.dispatch(relatedActions.getPage({ params: params }))
        },
        paginationResult: () =>
            store.select(relatedSelectors.selectPaginationResult),
        update: (item: R, transactionId: string) => {
            store.dispatch(relatedActions.updateItem({ item, transactionId }))
        },
        display: (id: number) => {
            store.dispatch(
                relatedActions.getItemById({
                    id: id,
                })
            )

            return store
                .select(relatedSelectors.selectEntityById(id))
                .pipe(
                    map(entity =>
                        entity && entity[label] ? entity[label] : ''
                    )
                )
        },
    }
}
