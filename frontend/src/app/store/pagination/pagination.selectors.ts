import { createSelector } from '@ngrx/store'
import { AppState } from '@reducers'
import { PaginationState } from './pagination.reducer'

/**
 * Selects the pagination state from the application state.
 * @param state - The application state.
 * @returns The pagination state.
 */
export const selectPaginationState = (state: AppState) => state.pagination

/**
 * Selects the pagination information from the pagination state.
 * @param state - The pagination state.
 * @returns The pagination information.
 */
export const selectPaginationInfo = createSelector(
    selectPaginationState,
    (state: PaginationState) => state.paginationInfo
)

/**
 * Selects the current entity type from the pagination state.
 * @param state - The pagination state.
 * @returns The current entity type.
 */
export const selectCurrentEntityType = createSelector(
    selectPaginationState,
    (state: PaginationState) => state.currentEntityType
)

/**
 * Selects the current page number from the pagination info.
 * @returns The current page number.
 */
export const selectCurrentPage = createSelector(
    selectPaginationInfo,
    paginationInfo => (paginationInfo ? paginationInfo.number : 0)
)

/**
 * Selects the total number of pages from the pagination info.
 * If the pagination info is not available, returns 0.
 *
 * @param {AppState} state - The application state.
 * @returns {number} - The total number of pages.
 */
export const selectTotalPages = createSelector(
    selectPaginationInfo,
    paginationInfo => (paginationInfo ? paginationInfo.totalPages : 0)
)

/**
 * Selects the number of elements per page from the pagination info.
 * If the pagination info is not available, returns 0.
 *
 * @param {AppState} state - The application state.
 * @returns {number} - The number of elements per page.
 */
export const selectPageSize = createSelector(
    selectPaginationInfo,
    paginationInfo => (paginationInfo ? paginationInfo.size : 0)
)

/**
 * Selects the total number of elements from the pagination info.
 * If the pagination info is not available, returns 0.
 *
 * @param {AppState} state - The application state.
 * @returns {number} - The total number of elements.
 */
export const selectTotalElements = createSelector(
    selectPaginationInfo,
    paginationInfo => (paginationInfo ? paginationInfo.totalElements : 0)
)
