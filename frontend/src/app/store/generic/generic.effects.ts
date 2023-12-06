import { Injectable } from '@angular/core'
import { Identifiable } from '@core/entity/identifiable.interface'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as PaginationActions from '@store/pagination/pagination.actions'
import { from, of } from 'rxjs'
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators'
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
     * Effect for getting items.
     * @returns An observable of the action to get items.
     */
    getItems$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.entityActions.getItems),
            mergeMap(() => {
                console.log('get items')
                return this.genericService.getAll().pipe(
                    switchMap(response =>
                        from([
                            this.entityActions.getPageSuccess({
                                page: response,
                            }),
                            PaginationActions.loadPageSuccess({
                                paginationInfo: response.page,
                            }),
                        ])
                    ),
                    catchError(error =>
                        of(this.entityActions.getItemsFailure({ error }))
                    )
                )
            })
        )
    })

    /**
     * Effect for getting a page of items.
     * @returns An observable of the action to get a page of items.
     */
    getPage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(this.entityActions.getPage),
            mergeMap(({ page, size }) =>
                this.genericService.getPage(page, size).pipe(
                    switchMap(response =>
                        from([
                            this.entityActions.getPageSuccess({
                                page: response,
                            }),
                            PaginationActions.loadPageSuccess({
                                paginationInfo: response.page,
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
            mergeMap(({ item }) =>
                this.genericService.create(item).pipe(
                    map(newItem =>
                        this.entityActions.addItemSuccess({
                            item: newItem,
                        })
                    ),
                    catchError(error =>
                        of(this.entityActions.addItemFailure({ error }))
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
            mergeMap(({ item }) =>
                this.genericService.update(item).pipe(
                    map(updatedItem =>
                        this.entityActions.updateItemSuccess({
                            item: updatedItem,
                        })
                    ),
                    catchError(error =>
                        of(this.entityActions.updateItemFailure({ error }))
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
}
