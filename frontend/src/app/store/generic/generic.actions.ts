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
        addItem: createAction(
            `[${entityType}] Add Item`,
            props<{ item: T; transactionId: string }>()
        ),
        addItemSuccess: createAction(
            `[${entityType}] Add Item Success`,
            props<{ item: T; transactionId: string }>()
        ),
        addItemFailure: createAction(
            `[${entityType}] Add Item Failure`,
            props<{ error: string | null; transactionId: string }>()
        ),
        updateItem: createAction(
            `[${entityType}] Update Item`,
            props<{ item: T; transactionId: string }>()
        ),
        updateItemSuccess: createAction(
            `[${entityType}] Update Item Success`,
            props<{ item: T; transactionId: string }>()
        ),
        updateItemFailure: createAction(
            `[${entityType}] Update Item Failure`,
            props<{ error: string | null; transactionId: string }>()
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

        // Related entity
        getRelatedEntity: createAction(
            `[${entityType}] Get Related Entity`,
            props<{ id: number; relation: string }>()
        ),
        getRelatedEntitySuccess: createAction(
            `[${entityType}] Get Related Entity Success`,
            props<{ id: number; relation: string; entity: Identifiable }>()
        ),
        getRelatedEntityFailure: createAction(
            `[${entityType}] Get Related Entity Failure`,
            props<{ error: string }>()
        ),

        updateRelatedEntity: createAction(
            `[${entityType}] Update Related Entity`,
            props<{
                id: number
                relation: string
                relatedEntityId: number
            }>()
        ),

        updateRelatedEntitySuccess: createAction(
            `[${entityType}] Update Related Entity Success`,
            props<{
                id: number
                relation: string
                relatedEntityId: number
            }>()
        ),

        updateRelatedEntityFailure: createAction(
            `[${entityType}] Update Related Entity Failure`,
            props<{ error: string }>()
        ),

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

        exportAll: createAction(`[${entityType}] Export All`),
        exportAllSuccess: createAction(`[${entityType}] Export All Success`),
        exportAllFailure: createAction(
            `[${entityType}] Export All Failure`,
            props<{ error: string }>()
        ),
        exportSelection: createAction(
            `[${entityType}] Export Selection`,
            props<{ ids: number[] }>()
        ),
        exportSelectionSuccess: createAction(
            `[${entityType}] Export Selection Success`
        ),
        exportSelectionFailure: createAction(
            `[${entityType}] Export Selection Failure`,
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

        resetEntities: createAction(`[${entityType}] Reset Entities`),
    }
}

export type EntityActions<T extends Identifiable> = ReturnType<
    typeof createEntityActions<T>
>
