import { createSelector } from '@ngrx/store'
import { AppState } from '@reducers'
import { NotificationState } from './notification.reducer'

export const selectNotificationsState = (state: AppState) => state.notifications

export const selectAllNotifications = createSelector(
    selectNotificationsState,
    (state: NotificationState) => state.notifications
)

export const selectNotificationById = (id: string) =>
    createSelector(selectNotificationsState, (state: NotificationState) =>
        state.notifications.find(notification => notification.id === id)
    )
