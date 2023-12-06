import { createAction, props } from '@ngrx/store'
import { Pagination } from './pagination.reducer'

/**
 * Action to load a specific page of entities.
 *
 * @param entityType - The type of entity to load.
 * @param page - The page number to load.
 * @param size - The number of entities per page.
 * @returns An action object with the entityType, page, and size.
 */
export const loadPage = createAction(
    '[Pagination] Load Page',
    props<{ entityType: string; page: number; size: number }>()
)

/**
 * Action to be dispatched when a page is successfully loaded.
 *
 * @param paginationInfo - The pagination information for the loaded page.
 * @returns An action object with the pagination information.
 */
export const loadPageSuccess = createAction(
    '[Pagination] Load Page Success',
    props<{ paginationInfo: Pagination }>()
)

/**
 * Action creator for the 'Load Page Failure' action.
 *
 * @param error - The error message associated with the failure.
 * @returns An action object with the error message.
 */
export const loadPageFailure = createAction(
    '[Pagination] Load Page Failure',
    props<{ error: string }>()
)

/**
 * Resets the pagination state.
 *
 * @returns An action object to reset the pagination state.
 */
export const resetPagination = createAction('[Pagination] Reset Pagination')

export const changePage = createAction(
    '[Pagination] Change Page',
    props<{ page: number }>()
)

/**
 * Action creator for the 'Change Page Size' action.
 *
 * @param size - The new page size.
 * @returns An action object with the new page size.
 */
export const changePageSize = createAction(
    '[Pagination] Change Page Size',
    props<{ size: number }>()
)
