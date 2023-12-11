import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import * as NotificationActions from '@store/notification/notification.actions'
import { Notice, NoticeType } from '@store/notification/notification.types'
import { ToastrService } from 'ngx-toastr'
import { v4 as uuidv4 } from 'uuid'

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private defaultDuration = 5000
    private dismissible = false

    constructor(
        private store: Store,
        private toastr: ToastrService
    ) {}

    private showNotification(
        type: NoticeType,
        title: string,
        message: string,
        options: { duration?: number; dismissible?: boolean } = {}
    ) {
        const {
            duration = this.defaultDuration,
            dismissible = this.dismissible,
        } = options
        const id = uuidv4()
        const notification: Notice = {
            id,
            type,
            title,
            message,
            datetime: new Date(),
        }

        this.store.dispatch(
            NotificationActions.addNotification({ notification })
        )

        const toastrFunc = {
            success: this.toastr.success,
            error: this.toastr.error,
            info: this.toastr.info,
            warning: this.toastr.warning,
        }[type]

        const active = toastrFunc.call(this.toastr, message, title, {
            timeOut: duration,
            closeButton: true,
        })

        active.onTap.subscribe(() => {
            this.store.dispatch(NotificationActions.deleteNotification({ id }))
        })

        if (dismissible) {
            active.onHidden.subscribe(() => {
                this.store.dispatch(
                    NotificationActions.deleteNotification({ id })
                )
            })
        }
    }

    /**
     * Displays a success notification with the specified message, title, duration, and dismissible option.
     *
     * @param message - The success message to display.
     * @param title - The title of the success notification.
     * @param options - The options of the success notification.
     * @param duration - The duration (in milliseconds) for which the success notification should be displayed. Optional.
     * @param dismissible - Specifies whether the success notification can be dismissed by the user. Optional.
     */
    success(
        title: string,
        message: string,
        options: { duration?: number; dismissible?: boolean } = {}
    ) {
        this.showNotification('success', title, message, options)
    }

    /**
     * Displays an error notification with the specified message, title, duration, and dismissible option.
     *
     * @param message - The error message to display.
     * @param title - The title of the error notification.
     * @param options - The options of the error notification.
     * @param duration - The duration (in milliseconds) for which the error notification should be displayed. Optional.
     * @param dismissible - Specifies whether the error notification can be dismissed by the user. Optional.
     */
    error(
        title: string,
        message: string,
        options: { duration?: number; dismissible?: boolean } = {}
    ) {
        this.showNotification('error', title, message, options)
    }

    /**
     * Displays an information notification with the specified message and title.
     *
     * @param message - The message to be displayed in the notification.
     * @param title - The title of the notification.
     * @param options - The options of the notification.
     * @param duration - The duration in milliseconds for which the notification should be displayed. Optional.
     * @param dismissible - Specifies whether the notification can be dismissed by the user. Optional.
     */
    info(
        title: string,
        message: string,
        options: { duration?: number; dismissible?: boolean } = {}
    ) {
        this.showNotification('info', title, message, options)
    }

    /**
     * Displays a warning notification with the specified message and title.
     *
     * @param message - The message to be displayed in the notification.
     * @param title - The title of the notification.
     * @param options - The options of the notification.
     * @param duration - The duration of the notification in milliseconds. Optional.
     * @param dismissible - Specifies whether the notification can be dismissed. Optional.
     */
    warning(
        title: string,
        message: string,
        options: { duration?: number; dismissible?: boolean } = {}
    ) {
        this.showNotification('warning', title, message, options)
    }

    /**
     * Resets the notifications in the store.
     */
    reset() {
        this.store.dispatch(NotificationActions.resetNotifications())
    }
}
