import { createAction, props } from '@ngrx/store'
import { Notice } from './notification.types'

/**
 * Adds a notification to the store.
 *
 * @param notification The notification to be added.
 * @returns An action object.
 */
export const addNotification = createAction(
    '[Notification] Add Notification',
    props<{ notification: Notice }>()
)

/**
 * Deletes a notification from the store.
 *
 * @param id The id of the notification to be deleted.
 * @returns An action object.
 */
export const deleteNotification = createAction(
    '[Notification] Delete Notification',
    props<{ id: string }>()
)

/**
 * Resets the notifications in the store.
 *
 * @returns An action object.
 */
export const resetNotifications = createAction(
    '[Notification] Reset Notifications'
)

/**
 * Loads the notifications from the store.
 *
 * @returns An action object.
 */
export const loadNotifications = createAction(
    '[Notification] Load Notifications'
)

/**
 * Action creator for loading notifications successfully.
 *
 * @param notifications - The array of notifications to be loaded.
 * @returns An action object with the notifications payload.
 */
export const loadNotificationsSuccess = createAction(
    '[Notification] Load Notifications Success',
    props<{ notifications: Notice[] }>()
)

/**
 * Action creator for loading notifications failure.
 *
 * @param error - The error object.
 * @returns An action object with the error.
 */
export const loadNotificationsFailure = createAction(
    '[Notification] Load Notifications Failure',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props<{ error: any }>()
)

/**
 * Action creator for saving notifications successfully.
 *
 * @returns An action object with the notifications.
 */
export const saveNotificationsSuccess = createAction(
    '[Notification] Save Notifications Success'
)

/**
 * Action creator for saving notifications failure.
 *
 * @param error - The error object.
 * @returns An action object with the error.
 */
export const saveNotificationsFailure = createAction(
    '[Notification] Save Notifications Failure',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props<{ error: any }>()
)
