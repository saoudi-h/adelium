import { createSelector } from '@ngrx/store'
import { AppState } from '@reducers'
import { NotificationState } from './notification.reducer'

/**
 * Selects the notification state from the application state.
 * @param state - The application state.
 * @returns The notification state.
 */
export const selectNotificationsState = (state: AppState) => state.notifications

/**
 * Selects all notifications from the store.
 * @returns All notifications.
 */
export const selectAllNotifications = createSelector(
    selectNotificationsState,
    (state: NotificationState) => state.notifications
)

/**
 * Selects a notification by id from the store.
 * @param id - The id of the notification to be selected.
 * @returns The notification with the given id.
 */
export const selectNotificationById = (id: string) =>
    createSelector(selectNotificationsState, (state: NotificationState) =>
        state.notifications.find(notification => notification.id === id)
    )
