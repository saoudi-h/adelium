import {
    animate,
    keyframes,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations'
import { Component } from '@angular/core'
import { ErrorIconComponent } from '@shared/components/icons/error-icon.component'
import { InfoIconComponent } from '@shared/components/icons/info-icon.component'
import { SuccessIconComponent } from '@shared/components/icons/success-icon.component'
import { WarningIconComponent } from '@shared/components/icons/warning-icon.component'

import { Toast } from 'ngx-toastr'

@Component({
    standalone: true,
    imports: [
        SuccessIconComponent,
        WarningIconComponent,
        ErrorIconComponent,
        InfoIconComponent,
    ],
    selector: '[custom-toast-component]',
    styles: `
            :host
                @apply alert rounded-xl transition-colors duration-300 hover:border-error/30 active:border-error/70 active:bg-error/30 backdrop-blur-sm
                border-radius: 0.75rem !important
                box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05) !important
                background-image: none !important
            
            .btn-custom
                -webkit-backface-visibility: hidden
                -webkit-transform: translateZ(0)
        `,
    template: `
        <div
            class="grid grid-cols-12 gap-2 text-base-content"
            [style.display]="state.value === 'inactive' ? 'none' : ''">
            <div class="absolute left-4 top-1/2 -translate-y-1/2 transform">
                @switch (toastPackage.toastType) {
                    @case ('toast-success') {
                        <app-success-icon className="h-6 w-6 text-success" />
                    }
                    @case ('toast-warning') {
                        <app-warning-icon className="h-6 w-6 text-warning" />
                    }
                    @case ('toast-error') {
                        <app-error-icon className="h-6 w-6 text-error" />
                    }
                    @case ('toast-info') {
                        <app-info-icon className="h-6 w-6 text-info" />
                    }
                }
            </div>
            <div class="col-span-9">
                @if (title) {
                    <div [class]="options.titleClass" [attr.aria-label]="title">
                        {{ title }}
                    </div>
                }
                @if (message && options.enableHtml) {
                    <div
                        role="alert"
                        [class]="options.messageClass"
                        [innerHTML]="message"></div>
                }
                @if (message && !options.enableHtml) {
                    <div
                        role="alert"
                        [class]="options.messageClass"
                        [attr.aria-label]="message">
                        {{ message }}
                    </div>
                }
            </div>
            <div class="col-span-3 text-right">
                @if (!options.closeButton) {
                    <a
                        class="btn-custom btn btn-sm"
                        (click)="action($event)"
                        (keyup.enter)="action($event)"
                        (keydown.enter)="action($event)"
                        (keypress.enter)="action($event)"
                        tabindex="0">
                        {{ undoString }}
                    </a>
                } @else {
                    <a
                        (click)="remove()"
                        (keyup.enter)="remove()"
                        (keydown.enter)="remove()"
                        (keypress.enter)="remove()"
                        tabindex="0"
                        class="btn-custom btn btn-sm">
                        fermer
                    </a>
                }
            </div>
        </div>
        @if (options.progressBar) {
            <div>
                <div class="toast-progress" [style.width]="width + '%'"></div>
            </div>
        }
    `,
    animations: [
        trigger('flyInOut', [
            state(
                'inactive',
                style({
                    opacity: 0,
                })
            ),
            transition(
                'inactive => active',
                animate(
                    '400ms ease-out',
                    keyframes([
                        style({
                            transform: 'translate3d(100%, 0, 0) skewX(-30deg)',
                            opacity: 0,
                        }),
                        style({
                            transform: 'skewX(20deg)',
                            opacity: 1,
                        }),
                        style({
                            transform: 'skewX(-5deg)',
                            opacity: 1,
                        }),
                        style({
                            transform: 'none',
                            opacity: 1,
                        }),
                    ])
                )
            ),
            transition(
                'active => removed',
                animate(
                    '400ms ease-out',
                    keyframes([
                        style({
                            opacity: 1,
                        }),
                        style({
                            transform: 'translate3d(100%, 0, 0) skewX(30deg)',
                            opacity: 0,
                        }),
                    ])
                )
            ),
        ]),
    ],
    preserveWhitespaces: false,
})
export class CustomToastComponent extends Toast {
    undoString = 'Annuler'

    action(event: Event) {
        event.stopPropagation()
        this.undoString = 'Annulé'
        this.toastPackage.triggerAction()
        return false
    }
}
