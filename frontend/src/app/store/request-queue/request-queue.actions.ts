/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { HttpHandler, HttpRequest } from '@angular/common/http'
import { createAction, props } from '@ngrx/store'

export const enqueueRequest = createAction(
    '[Request Queue] Enqueue Request',
    props<{ request: HttpRequest<any>; next: HttpHandler }>()
)

export const processQueue = createAction('[Request Queue] Process Queue')

export const clearQueue = createAction('[Request Queue] Clear Queue')

export const queueProcessingFailed = createAction(
    '[Request Queue] Queue Processing Failed',
    props<{ error: string | null }>()
)

export const clearQueueError = createAction('[Request Queue] Clear Queue Error')
