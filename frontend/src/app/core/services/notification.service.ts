import { Injectable } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { Observable, Subject } from 'rxjs'
import { v4 as uuidv4 } from 'uuid'

/**
 * Notification type
 */
type NotificationType = 'success' | 'error' | 'info' | 'warning'

/**
 * Notification interface
 */
export interface Notification {
    id: string
    type: NotificationType
    title: string
    message: string
    datetime: Date
}

/**
 * Notification service to show notifications.
 *
 * @example  // Show a success notification
 * this.notificationService.success('Success message')
 *
 * @example  // Show an error notification
 * this.notificationService.error('Error message')
 *
 */
@Injectable({ providedIn: 'root' })
/**
 * Service for managing notifications.
 */
export class NotificationService {
    private defaultDuration = 3000
    private subject = new Subject<Notification>()
    private history: Notification[] = []
    private maxHistorySize = 10
    private dissmissible = true

    constructor(private toastr: ToastrService) {
        this.loadFromLocalStorage()
    }

    /**
     * Get the history of notifications
     * */
    getHistory(): Notification[] {
        return this.history
    }

    /**
     * Clear the history of notifications
     * */
    reset(): void {
        this.history = []
    }

    /**
     * Get the subject to subscribe to notifications
     * */
    getNotification(): Observable<Notification> {
        return this.subject.asObservable()
    }

    /**
     * Add a notification to the history
     * @param id The id of the notification
     * @param type The type of the notification
     * @param message The message of the notification
     * @param duration The duration of the notification
     * @param dissmissible Whether the notification is dissmissible or not
     */
    private add(
        type: NotificationType,
        message: string,
        title: string = ''
    ): Notification {
        const notification = {
            id: uuidv4(),
            type,
            title,
            message,
            datetime: new Date(),
        }
        this.subject.next(notification)
        this.history.push(notification)
        if (this.history.length > this.maxHistorySize) {
            this.history.shift()
        }
        this.saveToLocalStorage()
        return notification
    }

    /**
     * Delete a notification from the history
     * @param notification The notification to delete
     * */
    delete(notification: Notification) {
        const index = this.history.indexOf(notification)
        if (index > -1) {
            this.history.splice(index, 1)
        }
        this.saveToLocalStorage()
    }

    /**
     * Delete a notification from the history by its id
     * @param id The id of the notification to delete
     * */
    deleteById(id: string) {
        const index = this.history.findIndex(
            notification => notification.id === id
        )
        if (index > -1) {
            this.history.splice(index, 1)
        }
        this.saveToLocalStorage()
    }

    /**
     * Dismiss a notification
     * @param notification The notification to dismiss
     * */
    dismiss(notification: Notification) {
        this.delete(notification)
    }

    /**
     * Dismiss a notification by its id
     * @param id The id of the notification to dismiss
     * */
    dismissById(id: string) {
        this.deleteById(id)
    }

    /**
     * Load the history from the local storage
     * */
    private loadFromLocalStorage() {
        const storedHistory = localStorage.getItem('notificationHistory')
        try {
            if (storedHistory) {
                this.history = JSON.parse(storedHistory)
            }
        } catch (e) {
            console.error(
                "Erreur lors de la lecture de l'historique des notifications",
                e
            )
        }
    }

    /**
     * Save the history to the local storage
     * */
    private saveToLocalStorage() {
        try {
            const serializedHistory = JSON.stringify(this.history)
            localStorage.setItem('notificationHistory', serializedHistory)
        } catch (e) {
            console.error(
                "Erreur lors de l'enregistrement de l'historique des notifications dans localStorage",
                e
            )
            localStorage.removeItem('notificationHistory')
            this.toastr.error(
                "Une erreur s'est produite lors de l'enregistrement de l'historique des notifications. Les données récentes pourraient ne pas être sauvegardées.",
                'Erreur de sauvegarde'
            )
            this.history = []
        }
    }

    /**
     * Show a notification
     * @param type The type of the notification
     * @param title The title of the notification
     * @param message The message of the notification
     * @param duration The duration of the notification
     * @param dissmissible Whether the notification is dissmissible or not
     * */
    private showNotification(
        type: NotificationType,
        title: string,
        message: string,
        duration: number = this.defaultDuration,
        dissmissible: boolean = this.dissmissible
    ) {
        const notification = this.add(type, message, title)
        const toastrFunc = {
            success: this.toastr.success,
            error: this.toastr.error,
            info: this.toastr.info,
            warning: this.toastr.warning,
        }[type]

        const active = toastrFunc.call(this.toastr, message, title, {
            timeOut: duration,
            closeButton: dissmissible,
        })

        active.onHidden.subscribe(() => {
            console.log('hidden')
            this.delete(notification)
        })
    }

    /**
     * Show a success notification
     * @param message The message of the notification
     * @param title The title of the notification
     * @param duration The duration of the notification
     * @param dissmissible Whether the notification is dissmissible or not
     */
    success(
        message: string,
        title: string,
        duration?: number,
        dissmissible?: boolean
    ) {
        this.showNotification('success', title, message, duration, dissmissible)
    }

    /**
     * Displays an error notification with the specified message, title, duration, and dismissible option.
     *
     * @param message - The error message to display.
     * @param title - The title of the error notification.
     * @param duration - The duration (in milliseconds) for which the error notification should be displayed. Optional.
     * @param dissmissible - Specifies whether the error notification can be dismissed by the user. Optional.
     */
    error(
        message: string,
        title: string,
        duration?: number,
        dissmissible?: boolean
    ) {
        this.showNotification('error', title, message, duration, dissmissible)
    }

    /**
     * Displays an information notification with the specified message and title.
     *
     * @param message - The message to be displayed in the notification.
     * @param title - The title of the notification.
     * @param duration - The duration in milliseconds for which the notification should be displayed. Optional.
     * @param dissmissible - Specifies whether the notification can be dismissed by the user. Optional.
     */
    info(
        message: string,
        title: string,
        duration?: number,
        dissmissible?: boolean
    ) {
        this.showNotification('info', title, message, duration, dissmissible)
    }

    /**
     * Displays a warning notification with the specified message and title.
     *
     * @param message - The message to be displayed in the notification.
     * @param title - The title of the notification.
     * @param duration - The duration of the notification in milliseconds. Optional.
     * @param dissmissible - Specifies whether the notification can be dismissed. Optional.
     */
    warning(
        message: string,
        title: string,
        duration?: number,
        dissmissible?: boolean
    ) {
        this.showNotification('warning', title, message, duration, dissmissible)
    }
}
