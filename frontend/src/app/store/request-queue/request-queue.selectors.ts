import { createSelector } from '@ngrx/store'
import { AppState } from '@reducers'
import { RequestQueueState } from './request-queue.reducer'

/**
 * Selects the request queue state from the root state.
 * @param state - The root state.
 * @returns The request queue state from the root state.
 */
export const selectRequestQueueState = (state: AppState) => state.requestQueue

/**
 * Selects the request queue from the request queue state.
 * @param state - The request queue state.
 * @returns The request queue from the request queue state.
 */
export const selectRequestQueue = createSelector(
    selectRequestQueueState,
    (state: RequestQueueState) => state.queue
)
/**
 * Selects the loading state from the request queue state.
 * @param state - The request queue state.
 * @returns The loading state from the request queue state.
 */
export const selectRequestQueueLoading = createSelector(
    selectRequestQueueState,
    (state: RequestQueueState) => state.loading
)

/**
 * Selects the error from the request queue state.
 * @param state - The request queue state.
 * @returns The error from the request queue state.
 */
export const selectRequestQueueError = createSelector(
    selectRequestQueueState,
    (state: RequestQueueState) => state.error
)
