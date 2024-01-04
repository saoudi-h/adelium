/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckBoxFieldComponent } from '@admin/forms/checkbox/checkbox-field.component'
import { DynamicSelectFieldComponent } from '@admin/forms/dynamic-select/dynamic-select-field.component'
import { EntityFormModel } from '@admin/forms/forms.types'
import { InputFieldComponent } from '@admin/forms/input/input-field.component'
import { SelectFieldComponent } from '@admin/forms/select/select-field.component'
import {
    animate,
    group,
    keyframes,
    query,
    style,
    transition,
    trigger,
} from '@angular/animations'
import { CommonModule } from '@angular/common'
import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    Output,
} from '@angular/core'
import { Identifiable } from '@core/entity/identifiable.interface'
import { CloseIconComponent } from '@shared/components/icons/close-icon.component'
import { SharedModule } from '@shared/shared.module'
import { AdminFormComponent } from './admin-form.component'
import { FormFieldsComponent } from './form-fields.component'

@Component({
    standalone: true,
    imports: [
        CommonModule,
        SharedModule,
        InputFieldComponent,
        CheckBoxFieldComponent,
        SelectFieldComponent,
        DynamicSelectFieldComponent,
        FormFieldsComponent,
        CloseIconComponent,
        AdminFormComponent,
    ],
    selector: '[form-modal]',
    template: `
        <div
            @formDialog
            class="modal-overlay"
            [class.active]="active"
            (click)="onOverlayClick($event)"
            (keyup.enter)="onKeyEnterPress($event)"
            role="dialog"
            class="fixed inset-0 left-0 top-0 z-40 m-0 flex h-screen max-h-[100vh] w-screen max-w-[100vw] items-center justify-center overflow-hidden overflow-y-hidden bg-base-100/70 p-0 backdrop-blur-sm">
            <div
                class="container modal-box max-w-none transform-none rounded-none bg-base-100/70 p-0 shadow-xl sm:rounded-lg md:rounded-xl lg:rounded-2xl xl:rounded-3xl"
                (click)="onModalClick($event)"
                (keyup.enter)="onModalClick($event)"
                role="document">
                <div
                    admin-form
                    [modalConfig]="modalConfig"
                    class="modal-content bg-base-200 bg-hero-pattern"
                    (closeModal)="close()"></div>
            </div>
        </div>
    `,
    animations: [
        trigger('formDialog', [
            transition(':enter', [
                style({ opacity: 0 }),
                group([
                    animate('300ms ease-out', style({ opacity: 1 })),
                    query('.modal-box', [
                        style({
                            transform: 'translate3d(0, -100%, 0) skewY(-30deg)',
                        }),
                        animate(
                            '400ms ease-out',
                            keyframes([
                                style({
                                    transform:
                                        'translate3d(0, -100%, 0) skewY(-30deg)',
                                }),
                                style({ transform: 'skewY(20deg)' }),
                                style({ transform: 'skewY(-5deg)' }),
                                style({ transform: 'none' }),
                            ])
                        ),
                    ]),
                ]),
            ]),
            transition(':leave', [
                group([
                    animate('300ms ease-out', style({ opacity: 0 })),
                    query('.modal-box', [
                        animate(
                            '400ms ease-out',
                            keyframes([
                                style({ transform: 'none', opacity: 1 }),
                                style({
                                    transform:
                                        'translate3d(100%, 0, 0) skewX(30deg)',
                                    opacity: 0,
                                }),
                            ])
                        ),
                    ]),
                ]),
            ]),
        ]),
    ],
})
export class FormModalComponent<T extends Identifiable> {
    @Output() closeModal = new EventEmitter<void>()
    @Input() modalConfig!: EntityFormModel<T>
    @Input() active = false
    @Input() closeOnEscape = false
    @Input() closeOnOverlayClick = false
    @Input() closeOnEnter = false

    close() {
        this.closeModal.emit()
    }

    /**
     * Handles the escape key press event.
     * @param event KeyboardEvent
     * @returns void
     **/
    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
        event.preventDefault()
        if (!this.closeOnEscape) return
        this.close()
    }

    /**
     * Handles the overlay click event.
     * @param event Event
     * @returns void
     */
    onOverlayClick(event: Event): void {
        event.preventDefault()
        if (!this.closeOnOverlayClick) return
        this.close()
    }

    /**
     * Handles the enter key press event.
     * @param event Event
     * @returns void
     */
    onKeyEnterPress(event: Event): void {
        event.preventDefault()
        if (!this.closeOnEnter) return
        this.close()
    }

    /**
     * Handles the modal click event.
     * @param event Event
     * @returns void
     */
    onModalClick(event: Event): void {
        event.stopPropagation()
    }
}
