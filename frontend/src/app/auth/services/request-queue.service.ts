/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import * as RequestQueueActions from '@store/request-queue/request-queue.actions'
import { Observable, forkJoin } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
/**
 * Service for managing a request queue.
 */
export class RequestQueueService {
    constructor(private store: Store) {}

    /**
     * Enqueues a request to the request queue.
     * @param request - The HTTP request to enqueue.
     * @param next - The HTTP handler for the request.
     */
    enqueueRequest(request: HttpRequest<any>, next: HttpHandler) {
        // Ajouter la requête à la file d'attente dans le store
        this.store.dispatch(
            RequestQueueActions.enqueueRequest({ request, next })
        )
    }

    /**
     * Processes the request queue.
     * @param queue - The array of requests and their handlers in the queue.
     * @returns An Observable that emits an array of HTTP events.
     */
    processQueue(
        queue: Array<{ request: HttpRequest<any>; next: HttpHandler }>
    ): Observable<HttpEvent<any>[]> {
        if (queue.length === 0) {
            return forkJoin([])
        }

        const requestObservables = queue.map(({ request, next }) =>
            next.handle(request)
        )

        return forkJoin(requestObservables)
    }

    /**
     * Clears the request queue.
     */
    clearQueue() {
        this.store.dispatch(RequestQueueActions.clearQueue())
    }

    /**
     * Handles an error in the request queue.
     * @param error - The error to handle.
     */
    handleQueueError(error: any) {
        this.store.dispatch(
            RequestQueueActions.queueProcessingFailed({ error })
        )
    }
}
