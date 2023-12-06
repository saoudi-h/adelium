/* eslint-disable @typescript-eslint/no-explicit-any */
import { createReducer, on } from '@ngrx/store'
import * as PaginationActions from './pagination.actions'

/**
 * Interface for pagination information.
 * @property size The number of elements in the page.
 * @property totalElements The total number of elements.
 * @property totalPages The total number of pages.
 * @property number The current page number.
 */
export interface Pagination {
    size: number
    totalElements: number
    totalPages: number
    number: number
}

/**
 * Interface for the pagination state.
 * @property paginationInfo The pagination information.
 * @property currentEntityType The current entity type.
 * @property error The error message.
 * @property loading Whether the page is loading.
 */
export interface PaginationState {
    paginationInfo: Pagination
    currentEntityType: string | null
    error: string | null
    loading: boolean
}

/**
 * The initial state for the pagination state.
 */
export const initialPaginationState: PaginationState = {
    paginationInfo: {
        size: 0,
        totalElements: 0,
        totalPages: 0,
        number: 0,
    },
    currentEntityType: null,
    error: null,
    loading: false,
}

/**
 * Reducer for the pagination state.
 */
export const paginationReducer = createReducer(
    initialPaginationState,
    on(
        PaginationActions.loadPage,
        (state, { entityType }): PaginationState => ({
            ...state,
            currentEntityType: entityType,
        })
    ),
    on(
        PaginationActions.loadPageSuccess,
        (state, { paginationInfo }): PaginationState => ({
            ...state,
            paginationInfo,
        })
    ),
    on(
        PaginationActions.loadPageFailure,
        (state): PaginationState => ({
            ...state,
            paginationInfo: { ...initialPaginationState.paginationInfo },
        })
    ),
    on(
        PaginationActions.resetPagination,
        (state): PaginationState => ({
            ...state,
            paginationInfo: { ...initialPaginationState.paginationInfo },
        })
    ),
    on(
        PaginationActions.changePage,
        (state, { page }): PaginationState => ({
            ...state,
            paginationInfo: { ...state.paginationInfo, number: page },
        })
    ),
    on(
        PaginationActions.changePageSize,
        (state, { size }): PaginationState => ({
            ...state,
            paginationInfo: { ...state.paginationInfo, size },
        })
    )
)
