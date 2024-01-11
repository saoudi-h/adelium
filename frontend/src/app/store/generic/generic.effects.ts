import { Injectable } from '@angular/core'
import { Identifiable } from '@core/entity/identifiable.interface'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { entityConfig } from '@store/entity-config'
import { from, of } from 'rxjs'
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators'
import { EntityActions } from './generic.actions'
import { GenericService } from './generic.service'
/**
 * Effects class for handling generic actions related to a specific type.
 * @template T - The type of the items being handled.
 * @param genericService - The service for the type.
 * @returns An effects class for handling generic actions related to a specific type.
 */
@Injectable()
export abstract class GenericEffects<T extends Identifiable> {
    /**
     * Constructor.
     * @param actions$ - The actions observable.
     * @param genericService - The service for the type.
     * @param entityActions - The actions for the type.
     * @param entityType - The type of the items being handled.
     */
    constructor(
        private actions$: Actions,
        private genericService: GenericService<T>,
        private entityActions: EntityActions<T>,
        private entityType: string
    ) {}

    /**
     * Effect for getting an item by its id.
     * @returns An observable of the action to get an item by its id.
     */
    getItemById$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.entityActions.getItemById),
            mergeMap(({ id }) =>
                this.genericService.getById(id).pipe(
                    map(item =>
                        this.entityActions.getItemByIdSuccess({ item })
                    ),
                    catchError(error =>
                        of(this.entityActions.getItemByIdFailure({ error }))
                    )
                )
            )
        )
    })

    /**
     * Effect for getting a page of items.
     * @returns An observable of the action to get a page of items.
     */
    getPage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.entityActions.getPage),
            mergeMap(({ params }) =>
                this.genericService.getPage(params).pipe(
                    switchMap(response =>
                        from([
                            this.entityActions.getPageSuccess({
                                page: response,
                            }),
                        ])
                    ),
                    catchError(error =>
                        of(this.entityActions.getPageFailure({ error }))
                    )
                )
            )
        )
    })

    /**
     * An effect that adds an item.
     * @returns An observable of actions.
     */
    addItem$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.entityActions.addItem),
            mergeMap(({ item, transactionId }) =>
                this.genericService.create(item).pipe(
                    map(item =>
                        this.entityActions.addItemSuccess({
                            item,
                            transactionId,
                        })
                    ),
                    catchError(error =>
                        of(
                            this.entityActions.addItemFailure({
                                error,
                                transactionId,
                            })
                        )
                    )
                )
            )
        )
    })

    /**
     * An effect that updates an item.
     * @returns An observable of actions.
     */
    updateItem$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.entityActions.updateItem),
            mergeMap(({ item, transactionId }) =>
                this.genericService.update(item).pipe(
                    map(item =>
                        this.entityActions.updateItemSuccess({
                            item,
                            transactionId,
                        })
                    ),
                    catchError(error =>
                        of(
                            this.entityActions.updateItemFailure({
                                error,
                                transactionId,
                            })
                        )
                    )
                )
            )
        )
    })

    /**
     * An effect that deletes an item.
     * @returns An observable of actions.
     */
    deleteItem$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.entityActions.deleteItem),
            mergeMap(({ id }) =>
                this.genericService.delete(id).pipe(
                    map(() => this.entityActions.deleteItemSuccess({ id })),
                    catchError(error =>
                        of(this.entityActions.deleteItemFailure({ error }))
                    )
                )
            )
        )
    })

    /**
     * An effect that deletes a selection of items.
     * @returns An observable of actions.
     */
    deleteSelection$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.entityActions.deleteSelection),
            mergeMap(({ ids }) =>
                this.genericService.deleteSelection(ids).pipe(
                    map(() =>
                        this.entityActions.deleteSelectionSuccess({ ids })
                    ),
                    catchError(error =>
                        of(this.entityActions.deleteSelectionFailure({ error }))
                    )
                )
            )
        )
    })

    /**
     * An effect that patches an item.
     * @returns An observable of actions.
     */
    patchItem$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.entityActions.patchItem),
            mergeMap(({ item }) =>
                this.genericService.patch(item).pipe(
                    map(updatedItem =>
                        this.entityActions.patchItemSuccess({
                            item: updatedItem,
                        })
                    ),
                    catchError(error =>
                        of(this.entityActions.patchItemFailure({ error }))
                    )
                )
            )
        )
    })

    getRelatedEntities$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.entityActions.getRelatedEntities),
            mergeMap(({ id, relation }) =>
                this.genericService.getRelatedEntities(id, relation).pipe(
                    map(entitiesPage =>
                        this.entityActions.getRelatedEntitiesSuccess({
                            id: id,
                            relation: relation,
                            entities: entitiesPage._embedded[relation],
                        })
                    ),
                    catchError(error => {
                        console.log('error', error)
                        return of(
                            this.entityActions.getRelatedEntitiesFailure({
                                error,
                            })
                        )
                    })
                )
            )
        )
    })

    getRelatedEntity$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.entityActions.getRelatedEntity),
            mergeMap(({ id, relation }) => {
                const relationName = this.getEntityRelationPartialUrl(relation)
                return this.genericService
                    .getRelatedEntity(id, relationName)
                    .pipe(
                        map(entity => {
                            return this.entityActions.getRelatedEntitySuccess({
                                id: id,
                                relation: relation,
                                entity: entity,
                            })
                        }),
                        catchError(error => {
                            console.log('error', error)
                            return of(
                                this.entityActions.getRelatedEntityFailure({
                                    error,
                                })
                            )
                        })
                    )
            })
        )
    })

    updateRelatedEntities$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.entityActions.updateRelatedEntities),
            mergeMap(({ id, relation, relatedEntityIds }) => {
                console.log(
                    'updateRelatedEntities',
                    id,
                    relation,
                    relatedEntityIds
                )
                const relationName = this.getEntityRelationPartialUrl(relation)
                return this.genericService
                    .updateRelatedEntities(id, relationName, relatedEntityIds)
                    .pipe(
                        map(() =>
                            this.entityActions.updateRelatedEntitiesSuccess({
                                id,
                                relation,
                                relatedEntityIds,
                            })
                        ),
                        catchError(error =>
                            of(
                                this.entityActions.updateRelatedEntitiesFailure(
                                    {
                                        error,
                                    }
                                )
                            )
                        )
                    )
            })
        )
    })

    updateChildrenEntitySuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.entityActions.getRelatedEntitiesSuccess),
            map(({ relation, entities }) => {
                const actionType = this.determineUpdateAction(relation)

                if (actionType) {
                    return actionType({ items: entities })
                }
                return { type: '[No Operation]' }
            })
        )
    })

    updateChildEntitySuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.entityActions.getRelatedEntitySuccess),
            map(({ relation, entity }) => {
                const actionType = this.determineUpdateAction(relation)

                if (actionType) {
                    return actionType({ items: [entity] })
                }
                return { type: '[No Operation]' }
            })
        )
    })

    exportAll$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.entityActions.exportAll),
            mergeMap(() =>
                this.genericService.exportAll(this.entityType).pipe(
                    tap(blob => {
                        const filename = `${
                            this.entityType
                        }_${new Date().toLocaleDateString()}.csv`
                        this.downloadFile(blob, filename)
                    }),
                    map(() => this.entityActions.exportAllSuccess()),
                    catchError(error =>
                        of(this.entityActions.exportAllFailure({ error }))
                    )
                )
            )
        )
    })

    exportSelection$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.entityActions.exportSelection),
            mergeMap(({ ids }) =>
                this.genericService.exportSelection(this.entityType, ids).pipe(
                    tap(blob => {
                        const filename = `${
                            this.entityType
                        }_${new Date().toLocaleDateString()}.csv`
                        this.downloadFile(blob, filename)
                    }),
                    map(() => this.entityActions.exportSelectionSuccess()),
                    catchError(error =>
                        of(
                            this.entityActions.exportSelectionFailure({
                                error,
                            })
                        )
                    )
                )
            )
        )
    })

    private downloadFile(blob: Blob, filename: string) {
        const url = window.URL.createObjectURL(blob)
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.download = filename
        anchor.click()
        window.URL.revokeObjectURL(url)
    }

    private determineUpdateAction = (relation: string) => {
        const relationName = this.getEntityRelationName(relation)
        if (!relationName) {
            console.error('relationName is undefined')
            return undefined
        }
        const relationConfig = entityConfig[relationName]
        if (relationConfig && relationConfig.actions) {
            const updateAction = relationConfig.actions['addSelectionSuccess']
            if (updateAction) {
                return updateAction
            }
        }
        return undefined
    }

    private getEntityRelationName(relation: string): string | undefined {
        return (
            entityConfig[this.entityType]?.relations[relation]?.name ??
            undefined
        )
    }

    private getEntityRelationPartialUrl(relation: string): string {
        return entityConfig[this.entityType].relations[relation].partialUrl
    }
}
