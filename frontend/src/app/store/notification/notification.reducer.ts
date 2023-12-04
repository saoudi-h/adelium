import { createReducer, on } from '@ngrx/store'
import * as NotificationActions from './notification.actions'
import { Notice } from './notification.types'

/**
 * The notification state interface.
 */
export interface NotificationState {
    notifications: Notice[]
}

/**
 * The initial state for the notification state.
 */
export const initialState: NotificationState = {
    notifications: [],
}

/**
 * Reducer function for managing notifications in the application state.
 *
 * @param state - The current state of the notification.
 * @param action - The action object that contains the type and payload.
 * @returns The updated state after applying the action.
 */
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
    ),
    on(
        NotificationActions.loadNotificationsSuccess,
        (state, { notifications }): NotificationState => ({
            notifications,
        })
    ),
    on(
        NotificationActions.loadNotificationsFailure,
        (): NotificationState => ({
            notifications: [],
        })
    )
)
