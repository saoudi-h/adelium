import { Injectable } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { BehaviorSubject, Observable } from 'rxjs'
import { v4 as uuidv4 } from 'uuid'

/**
 * Notice type
 */
type NoticeType = 'success' | 'error' | 'info' | 'warning'

/**
 * Notice interface
 */
export interface Notice {
    id: string
    type: NoticeType
    title: string
    message: string
    datetime: Date
}

/**
 * Notice service to show notifications.
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
    private defaultDuration = 5000
    private historySubject: BehaviorSubject<Notice[]> = new BehaviorSubject<
        Notice[]
    >([])
    private history$: Observable<Notice[]> = this.historySubject.asObservable()
    private _history: Notice[] = []
    private get history(): Notice[] {
        return this._history
    }
    private set history(value: Notice[]) {
        this._history = value
        this.historySubject.next(value)
        this.saveToLocalStorage()
    }
    private maxHistorySize = 10
    private dismissible = false

    constructor(private toastr: ToastrService) {
        this.loadFromLocalStorage()
    }

    /**
     * Clear the history of notifications
     * */
    reset(): void {
        this.history = []
    }

    /**
     * Get the notifications observable
     * */
    getNotifications(): Observable<Notice[]> {
        return this.history$
    }

    /**
     * Add a notification to the history
     * @param id The id of the notification
     * @param type The type of the notification
     * @param message The message of the notification
     * @param duration The duration of the notification
     * @param dismissible Whether the notification is dismissible or not
     */
    private add(type: NoticeType, message: string, title: string = ''): Notice {
        const notification = {
            id: uuidv4(),
            type,
            title,
            message,
            datetime: new Date(),
        }
        this.history.push(notification)
        if (this.history.length > this.maxHistorySize) {
            this.history.shift()
        }
        this.historySubject.next(this.history)
        this.saveToLocalStorage()
        return notification
    }

    /**
     * Delete a notification from the history
     * @param notification The notification to delete
     * */
    delete(notification: Notice) {
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
    dismiss(notification: Notice) {
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
        try {
            const storedHistory = localStorage.getItem('notificationHistory')
            if (storedHistory) {
                this.history = JSON.parse(storedHistory).map(
                    (item: Notice) => ({
                        ...item,
                        datetime: new Date(item.datetime),
                    })
                )
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
     * @param options The options of the notification
     * @param duration The duration of the notification in milliseconds (default: 5000) (optional)
     * @param dismissible Whether the notification is dismissible or not (default: false) (optional)
     * */
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
        const notification = this.add(type, message, title)
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
            this.delete(notification)
        })
        if (dismissible) {
            active.onHidden.subscribe(() => {
                this.delete(notification)
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
}
