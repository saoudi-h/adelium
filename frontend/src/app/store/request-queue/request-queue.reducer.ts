/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { HttpHandler, HttpRequest } from '@angular/common/http'
import { createReducer, on } from '@ngrx/store'
import * as requstQueueActions from '@store/request-queue/request-queue.actions'

/**
 * The state of the request queue.
 * @property queue - The queue of requests.
 * @property loading - The loading state of the request queue.
 * @property error - The error state of the request queue.
 * @interface RequestQueueState
 * @see initialState
 * @see requestQueueReducer
 */
export interface RequestQueueState {
    queue: Array<{ request: HttpRequest<any>; next: HttpHandler }>
    loading: boolean
    error: string | null
}

/**
 * The initial state of the request queue.
 * @property queue - The queue of requests.
 * @property loading - The loading state of the request queue.
 * @property error - The error state of the request queue.
 * @type RequestQueueState
 * @see RequestQueueState
 * @see initialState
 * @see requestQueueReducer
 */
export const initialState: RequestQueueState = {
    queue: [],
    loading: false,
    error: null,
}

/**
 * Reducer function for the request queue.
 * @param state - The current state of the request queue.
 * @param action - The action to be performed on the request queue.
 * @returns The new state of the request queue.
 */
export const requestQueueReducer = createReducer(
    initialState,
    on(
        requstQueueActions.enqueueRequest,
        (state, { request, next }): RequestQueueState => ({
            ...state,
            queue: [...state.queue, { request, next }],
            loading: true,
            error: null,
        })
    ),

    on(
        requstQueueActions.processQueue,
        (state): RequestQueueState => ({
            ...state,
            queue: [],
            loading: false,
            error: null,
        })
    ),
    on(
        requstQueueActions.clearQueue,
        (state): RequestQueueState => ({
            ...state,
            queue: [],
            loading: false,
            error: null,
        })
    ),
    on(
        requstQueueActions.queueProcessingFailed,
        (state, { error }): RequestQueueState => ({
            ...state,
            error,
            loading: false,
        })
    ),
    on(
        requstQueueActions.clearQueueError,
        (state): RequestQueueState => ({
            ...state,
            error: null,
        })
    )
)
