import { Injectable } from '@angular/core'
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { AppState } from '@reducers'
import * as AppActions from '@store/app/app.actions'
import { ToastrService } from 'ngx-toastr'
import { of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import * as NotificationActions from './notification.actions'
import * as NotificationSelectors from './notification.selectors'
import { Notice } from './notification.types'

/**
 * NotificationEffects class represents the effects for handling notifications in the application.
 * It listens to specific actions and performs side effects such as loading and saving notifications.
 */
@Injectable()
export class NotificationEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private toastr: ToastrService
    ) {}

    /**
     * Effect for loading notifications from the session storage.
     */
    loadNotifications$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(NotificationActions.loadNotifications, AppActions.appInit),
            switchMap(() => {
                const storedData = localStorage.getItem('notificationHistory')
                if (storedData) {
                    try {
                        const notifications = JSON.parse(storedData).map(
                            (item: Notice) => ({
                                ...item,
                                datetime: new Date(item.datetime),
                            })
                        )
                        return of(
                            NotificationActions.loadNotificationsSuccess({
                                notifications,
                            })
                        )
                    } catch (error) {
                        return of(
                            NotificationActions.loadNotificationsFailure({
                                error,
                            })
                        )
                    }
                } else {
                    return of(
                        NotificationActions.loadNotificationsSuccess({
                            notifications: [],
                        })
                    )
                }
            })
        )
    })

    /**
     * Effect for saving notifications to the session storage.
     */
    saveNotifications$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(
                NotificationActions.addNotification,
                NotificationActions.deleteNotification,
                NotificationActions.resetNotifications
            ),
            concatLatestFrom(() =>
                this.store.select(NotificationSelectors.selectAllNotifications)
            ),
            switchMap(([, notifications]) => {
                try {
                    localStorage.setItem(
                        'notificationHistory',
                        JSON.stringify(notifications)
                    )
                    return of(NotificationActions.saveNotificationsSuccess())
                } catch (error) {
                    console.error('Error saving notifications')
                    return of(
                        NotificationActions.saveNotificationsFailure({ error })
                    )
                }
            })
        )
    })
}
