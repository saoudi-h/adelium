import {
    animate,
    query,
    stagger,
    style,
    transition,
    trigger,
} from '@angular/animations'
import { CommonModule } from '@angular/common'
import { Component, ViewChild } from '@angular/core'
import { Store } from '@ngrx/store'
import { AppState } from '@reducers'
import { ErrorIconComponent } from '@shared/components/icons/error-icon.component'
import { InfoIconComponent } from '@shared/components/icons/info-icon.component'
import { NotificationIconComponent } from '@shared/components/icons/notification-icon.component'
import { SuccessIconComponent } from '@shared/components/icons/success-icon.component'
import { WarningIconComponent } from '@shared/components/icons/warning-icon.component'
import { DropdownComponent } from '@shared/components/utility/dropdown/dropdown.component'
import { SharedModule } from '@shared/shared.module'
import * as NotificationActions from '@store/notification/notification.actions'
import * as NotificationSelectors from '@store/notification/notification.selectors'
import { Notice } from '@store/notification/notification.types'
import { ToastContainerDirective } from 'ngx-toastr'
import { Observable, map } from 'rxjs'

/**
 * Component for displaying notifications.
 *
 * @remarks
 * This component is responsible for rendering a dropdown menu that displays notifications.
 * It uses the ToastrService to show toast notifications and interacts with the Store to manage notifications.
 *
 * @example
 * ```html
 * <app-notificator-widget></app-notificator-widget>
 * ```
 *
 * @selector [notificator-widget]
 * @standalone true
 * @imports CommonModule, SharedModule, NotificationIconComponent, SuccessIconComponent, WarningIconComponent, ErrorIconComponent, InfoIconComponent, ToastContainerDirective, DropdownComponent
 * @template `<div class="relative">...</div>`
 * @animations listAnimation
 */
@Component({
    selector: '[notificator-widget]',
    standalone: true,
    imports: [
        CommonModule,
        SharedModule,
        NotificationIconComponent,
        SuccessIconComponent,
        WarningIconComponent,
        ErrorIconComponent,
        InfoIconComponent,
        ToastContainerDirective,
        DropdownComponent,
    ],
    template: ` <div class="relative">
        <app-dropdown>
            <button
                dropdown-button
                (click)="dropdown.toggleDropdown()"
                tabindex="0"
                class="btn btn-square btn-ghost relative">
                <app-notification-icon className="h-6 w-6" />
                <span
                    *ngIf="((notificationCount$ | async) ?? 0) > 0"
                    class="countdown absolute right-2 top-2 inline-flex -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-primary px-2 py-1 text-xs font-thin leading-none text-primary-content">
                    <span
                        style="--value: {{ notificationCount$ | async }};"
                        class=""></span>
                </span>
            </button>

            <div
                dropdown-content
                tabindex="0"
                class="menu-sm mt-4 max-h-[80vh] w-64 overflow-y-auto rounded-2xl bg-base-300 p-2 shadow">
                <!-- Toast -->
                <ul
                    class="flex flex-col gap-2 py-2"
                    [@listAnimation]="(notificationCount$ | async) ?? 0">
                    <li
                        *ngFor="let notification of notifications$ | async"
                        (click)="deleteById($event, notification.id)"
                        (keyup.enter)="deleteById($event, notification.id)"
                        tabindex="0"
                        class="alert w-full grid-cols-4 rounded-xl bg-base-100 px-2 py-2 transition-colors duration-300 hover:border-error/30 active:!border-error/70 active:!bg-error/30">
                        <div class="col-span-1">
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
                                    <app-info-icon
                                        className="h-6 w-6 text-info" />
                                }
                            }
                        </div>
                        <div class="col-span-3 grid  w-full grow">
                            <h3 class="justify-self-start font-bold">
                                {{ notification.title }}
                            </h3>
                            <div class="grow justify-self-start text-sm">
                                {{ notification.message }}
                            </div>
                            <div
                                class="justify-self-end text-xs font-semibold text-base-content/70">
                                {{ notification.datetime | dateDistance }}
                            </div>
                        </div>
                    </li>
                    @if (((notificationCount$ | async) ?? 0) > 0) {
                        <div class="divider"></div>

                        <button
                            (click)="clearAllNotifications($event)"
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
                </ul>
            </div>
        </app-dropdown>
    </div>`,
    animations: [
        trigger('listAnimation', [
            transition('* <=> *', [
                query(
                    ':leave',
                    [
                        stagger(
                            100,
                            animate(
                                '0.5s',
                                style({
                                    opacity: 0,
                                    transform: 'skewX(30deg) translateX(100%)',
                                })
                            )
                        ),
                    ],
                    { optional: true }
                ),
                query(
                    ':enter',
                    [
                        style({ opacity: 0 }),
                        stagger(
                            100,
                            animate(
                                '0.5s',
                                style({
                                    opacity: 1,
                                    transform: 'skewX(0deg)  translateX(0%)',
                                })
                            )
                        ),
                    ],
                    { optional: true }
                ),
            ]),
        ]),
    ],
})
export class NotificatorWidgetComponent {
    notifications$: Observable<Notice[]>
    notificationCount$: Observable<number>
    @ViewChild(DropdownComponent) dropdown!: DropdownComponent
    notifications: Notice[] = []

    constructor(private store: Store<AppState>) {
        this.notifications$ = this.store.select(
            NotificationSelectors.selectAllNotifications
        )
        this.notificationCount$ = this.notifications$.pipe(
            map(notifications => notifications.length)
        )
    }

    clearAllNotifications(event: Event) {
        event.stopPropagation()
        this.store.dispatch(NotificationActions.resetNotifications())
    }

    deleteById(event: Event, id: string) {
        event.stopPropagation()
        this.store.dispatch(NotificationActions.deleteNotification({ id }))
    }
}
