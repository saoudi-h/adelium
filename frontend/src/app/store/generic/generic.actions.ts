import { Identifiable } from '@core/entity/identifiable.interface'
import { Page } from '@core/entity/page.entity'
import { createAction, props } from '@ngrx/store'
import { PaginationParams, SortCriterion } from './generic.reducer'

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
        getPage: createAction(
            `[${entityType}] Get Page`,
            props<{ params: PaginationParams }>()
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
        addSelection: createAction(
            `[${entityType}] Add Selection`,
            props<{ ids: number[] }>()
        ),
        addSelectionSuccess: createAction(
            `[${entityType}] Add Selection Success`,
            props<{ items: T[] }>()
        ),
        addSelectionFailure: createAction(
            `[${entityType}] Add Selection Failure`,
            props<{ error: string | null }>()
        ),

        // pagination
        updatePaginationParams: createAction(
            `[${entityType}] Update Pagination Params`,
            props<{
                page?: number
                size?: number
                sort?: SortCriterion[]
            }>()
        ),

        resetPaginationParams: createAction(
            `[${entityType}] Reset Pagination Params`
        ),

        // Related entities
        getRelatedEntities: createAction(
            `[${entityType}] Get Related Entities`,
            props<{ id: number; relation: string }>()
        ),
        getRelatedEntitiesSuccess: createAction(
            `[${entityType}] Get Related Entities Success`,
            props<{ id: number; relation: string; entities: Identifiable[] }>()
        ),
        getRelatedEntitiesFailure: createAction(
            `[${entityType}] Get Related Entities Failure`,
            props<{ error: string }>()
        ),
        // addRelatedEntity: createAction(
        //     `[${entityType}] Add Related Entity`,
        //     props<{
        //         entityId: number
        //         relation: string
        //         relatedEntity: Identifiable
        //     }>()
        // ),
        // addRelatedEntitySuccess: createAction(
        //     `[${entityType}] Add Related Entity Success`,
        //     props<{ relation: string; relatedEntity: Identifiable }>()
        // ),
        // addRelatedEntityFailure: createAction(
        //     `[${entityType}] Add Related Entity Failure`,
        //     props<{ error: string }>()
        // ),
        updateRelatedEntities: createAction(
            `[${entityType}] Update Related Entity`,
            props<{
                id: number
                relation: string
                relatedEntityIds: number[]
            }>()
        ),
        updateRelatedEntitiesSuccess: createAction(
            `[${entityType}] Update Related Entity Success`,
            props<{
                id: number
                relation: string
                relatedEntityIds: number[]
            }>()
        ),
        updateRelatedEntitiesFailure: createAction(
            `[${entityType}] Update Related Entity Failure`,
            props<{ error: string }>()
        ),
        // removeRelatedEntity: createAction(
        //     `[${entityType}] Remove Related Entity`,
        //     props<{
        //         entityId: number
        //         relation: string
        //         relatedEntityId: number
        //     }>()
        // ),
        // removeRelatedEntitySuccess: createAction(
        //     `[${entityType}] Remove Related Entity Success`,
        //     props<{ relation: string; relatedEntityId: number }>()
        // ),
        // removeRelatedEntityFailure: createAction(
        //     `[${entityType}] Remove Related Entity Failure`,
        //     props<{ error: string }>()
        // ),
    }
}

export type EntityActions<T extends Identifiable> = ReturnType<
    typeof createEntityActions<T>
>
