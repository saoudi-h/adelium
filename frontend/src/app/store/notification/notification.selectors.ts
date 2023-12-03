import { createFeatureSelector, createSelector } from '@ngrx/store'
import { NotificationState } from './notification.reducer'

/**
 * Selects the notifications state from the store.
 * @returns {MemoizedSelector<object, NotificationState>} The memoized selector function.
 */
export const selectNotificationsState =
    createFeatureSelector<NotificationState>('notifications')

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
