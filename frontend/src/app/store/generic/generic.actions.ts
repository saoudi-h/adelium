import { Identifiable } from '@core/entity/identifiable.interface'
import { Page } from '@core/entity/page.entity'
import { createAction, props } from '@ngrx/store'

export function createEntityActions<T extends Identifiable>(
    entityType: string
) {
    return {
        getItemById: createAction(
            `[${entityType}] Get Item By ID`,
            props<{ id: number }>()
        ),
        getItemByIdSuccess: createAction(
            `[${entityType}] Get Item By ID Success`,
            props<{ item: T }>()
        ),
        getItemByIdFailure: createAction(
            `[${entityType}] Get Item By ID Failure`,
            props<{ error: string | null }>()
        ),
        getItems: createAction(`[${entityType}] Get Items`),
        getItemsSuccess: createAction(
            `[${entityType}] Get Items Success`,
            props<{ page: Page<T> }>()
        ),
        getItemsFailure: createAction(
            `[${entityType}] Get Items Failure`,
            props<{ error: string | null }>()
        ),
        getPage: createAction(
            `[${entityType}] Get Page`,
            props<{ page: number; size: number }>()
        ),
        getPageSuccess: createAction(
            `[${entityType}] Get Page Success`,
            props<{ page: Page<T> }>()
        ),
        getPageFailure: createAction(
            `[${entityType}] Get Page Failure`,
            props<{ error: string | null }>()
        ),
        addItem: createAction(`[${entityType}] Add Item`, props<{ item: T }>()),
        addItemSuccess: createAction(
            `[${entityType}] Add Item Success`,
            props<{ item: T }>()
        ),
        addItemFailure: createAction(
            `[${entityType}] Add Item Failure`,
            props<{ error: string | null }>()
        ),
        updateItem: createAction(
            `[${entityType}] Update Item`,
            props<{ item: T }>()
        ),
        updateItemSuccess: createAction(
            `[${entityType}] Update Item Success`,
            props<{ item: T }>()
        ),
        updateItemFailure: createAction(
            `[${entityType}] Update Item Failure`,
            props<{ error: string | null }>()
        ),
        patchItem: createAction(
            `[${entityType}] Patch Item`,
            props<{ item: T }>()
        ),
        patchItemSuccess: createAction(
            `[${entityType}] Patch Item Success`,
            props<{ item: T }>()
        ),
        patchItemFailure: createAction(
            `[${entityType}] Patch Item Failure`,
            props<{ error: string | null }>()
        ),
        deleteItem: createAction(
            `[${entityType}] Delete Item`,
            props<{ id: number }>()
        ),
        deleteItemSuccess: createAction(
            `[${entityType}] Delete Item Success`,
            props<{ id: number }>()
        ),
        deleteItemFailure: createAction(
            `[${entityType}] Delete Item Failure`,
            props<{ error: string | null }>()
        ),
        deleteSelection: createAction(
            `[${entityType}] Delete Selection`,
            props<{ ids: number[] }>()
        ),
        deleteSelectionSuccess: createAction(
            `[${entityType}] Delete Selection Success`,
            props<{ ids: number[] }>()
        ),
        deleteSelectionFailure: createAction(
            `[${entityType}] Delete Selection Failure`,
            props<{ error: string | null }>()
        ),
    }
}

export type EntityActions<T extends Identifiable> = ReturnType<
    typeof createEntityActions<T>
>
