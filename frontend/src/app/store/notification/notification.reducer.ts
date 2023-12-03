import { createReducer, on } from '@ngrx/store'
import * as NotificationActions from './notification.actions'
import { Notice } from './notification.types'

export interface NotificationState {
    notifications: Notice[]
}
export const initialState: NotificationState = {
    notifications: [],
}

export const notificationReducer = createReducer(
    initialState,
    on(
        NotificationActions.addNotification,
        (state, { notification }): NotificationState => ({
            ...state,
            notifications: [...state.notifications, notification],
        })
    ),
    on(
        NotificationActions.deleteNotification,
        (state, { id }): NotificationState => ({
            ...state,
            notifications: state.notifications.filter(notif => notif.id !== id),
        })
    ),

    on(
        NotificationActions.resetNotifications,
        (state): NotificationState => ({
            ...state,
            notifications: [],
        })
    )
)
