import { createAction, props } from '@ngrx/store'
import { Notice } from './notification.types'

export const addNotification = createAction(
    '[Notification] Add Notification',
    props<{ notification: Notice }>()
)

export const deleteNotification = createAction(
    '[Notification] Delete Notification',
    props<{ id: string }>()
)

export const resetNotifications = createAction(
    '[Notification] Reset Notifications'
)

export const loadNotifications = createAction(
    '[Notification] Load Notifications'
)

export const loadNotificationsSuccess = createAction(
    '[Notification] Load Notifications Success',
    props<{ notifications: Notice[] }>()
)

export const loadNotificationsFailure = createAction(
    '[Notification] Load Notifications Failure',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props<{ error: any }>()
)

export const saveNotificationsSuccess = createAction(
    '[Notification] Save Notifications Success'
)

export const saveNotificationsFailure = createAction(
    '[Notification] Save Notifications Failure',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props<{ error: any }>()
)
