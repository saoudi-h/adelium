import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import {
    Notice,
    NotificationService,
} from '@core/services/notification.service'
import { ErrorIconComponent } from '@shared/components/icons/error-icon.component'
import { InfoIconComponent } from '@shared/components/icons/info-icon.component'
import { NotificationIconComponent } from '@shared/components/icons/notification-icon.component'
import { SuccessIconComponent } from '@shared/components/icons/success-icon.component'
import { WarningIconComponent } from '@shared/components/icons/warning-icon.component'
import { formatDistance } from 'date-fns'
import fr from 'date-fns/locale/fr'

/**
 * Notificator component.
 * Displays notifications in a dropdown menu in the navbar.
 */
@Component({
    selector: 'app-notificator',
    standalone: true,
    imports: [
        CommonModule,
        NotificationIconComponent,
        SuccessIconComponent,
        WarningIconComponent,
        ErrorIconComponent,
        InfoIconComponent,
    ],
    template: `<div class="dropdown dropdown-end">
        <label for="" tabindex="0" class="btn btn-square btn-ghost relative">
            <app-notification-icon className="h-6 w-6" />
            <span
                *ngIf="count() > 0"
                class="countdown absolute right-2 top-2 inline-flex -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-primary px-2 py-1 text-xs font-thin leading-none text-white">
                <span style="--value: {{ count() }};" class=""></span>
            </span>
        </label>

        <ul
            tabindex="0"
            class="dropdown-content menu-sm z-[1] mt-3 w-64 rounded-2xl bg-base-300 p-2 shadow">
            <li class="flex flex-col gap-2 py-2">
                @for (notification of notifications; track notification) {
                    <div
                        role="alert"
                        class="alert rounded-xl transition-colors duration-300 hover:border-error/30 active:!border-error/70 active:!bg-error/30">
                        @switch (notification.type) {
                            @case ('success') {
                                <app-success-icon
                                    className="h-6 w-6 text-success" />
                            }
                            @case ('warning') {
                                <app-warning-icon
                                    className="h-6 w-6 text-warning" />
                            }
                            @case ('error') {
                                <app-error-icon
                                    className="h-6 w-6 text-error" />
                            }
                            @case ('info') {
                                <app-info-icon className="h-6 w-6 text-info" />
                            }
                        }
                        <div class="">
                            <h3 class="font-bold">{{ notification.title }}</h3>
                            <div class="text-xs">
                                {{ notification.message }}
                            </div>
                            <div class="text-xs font-thin text-primary">
                                {{ formatDateDistance(notification.datetime) }}
                            </div>
                        </div>
                    </div>
                }
                @if (count() > 0) {
                    <div class="divider"></div>

                    <button
                        (click)="clearAllNotifications()"
                        class="btn btn-outline btn-error content-center text-center text-sm ">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-5 w-5">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>

                        <span class="pl-4">Effacer tout</span>
                    </button>
                } @else {
                    <div class="text-center text-sm text-primary">
                        Aucune notification
                    </div>
                }
            </li>
        </ul>
    </div>`,
})
export class NotificatorComponent implements OnInit {
    notifications: Notice[] = []

    constructor(private notificationService: NotificationService) {}

    ngOnInit() {
        this.notificationService.getNotifications().subscribe(notifications => {
            this.notifications = notifications
        })
    }

    /**
     * Clear all notifications
     */
    clearAllNotifications() {
        this.notificationService.reset()
        this.notifications = []
    }

    /**
     * Get the number of notifications
     * @returns Number of notifications
     * */
    count() {
        return this.notifications.length
    }

    /**
     * Format a date to a human readable distance
     * @param date Date to format
     * @returns Formatted date
     */
    formatDateDistance(date: Date) {
        return formatDistance(date, new Date(), {
            addSuffix: false,
            locale: fr,
        })
    }
}