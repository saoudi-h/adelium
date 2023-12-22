/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckBoxFieldComponent } from '@admin/forms/checkbox/checkbox-field.component'
import { DynamicSelectFieldComponent } from '@admin/forms/dynamic-select/dynamic-select-field.component'
import { EntityFormModel } from '@admin/forms/forms.types'
import { InputFieldComponent } from '@admin/forms/input/input-field.component'
import { SelectFieldComponent } from '@admin/forms/select/select-field.component'
import { FormModalService } from '@admin/modal/formModal.service'
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
import { Component, HostListener } from '@angular/core'
import { Identifiable } from '@core/entity/identifiable.interface'
import { CloseIconComponent } from '@shared/components/icons/close-icon.component'
import { SharedModule } from '@shared/shared.module'
import { Observable } from 'rxjs'
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
    selector: 'app-form-modal',
    template: ` @for (
        modalConfig of formModalStack$ | async;
        track modalConfig;
        let i = $index
    ) {
        <div
            @formDialog
            class="modal-overlay"
            [class.active]="i === ((formModalStack$ | async)?.length || 0 - 1)"
            (click)="onOverlayClick($event)"
            (keyup.enter)="onKeyEnterPress($event)"
            tabindex="0"
            class="fixed inset-0 left-0 top-0 z-[1000] m-0 flex h-screen w-screen items-center justify-center overflow-hidden overflow-y-hidden bg-base-100/70 p-0 backdrop-blur-sm">
            <div
                class="container modal-box max-w-none transform-none rounded-none bg-base-100/70 p-0 shadow-xl sm:rounded-lg md:rounded-xl lg:rounded-2xl xl:rounded-3xl"
                (click)="onModalClick($event)"
                (keyup.enter)="onModalClick($event)"
                tabindex="0">
                <div
                    admin-form
                    [modalConfig]="modalConfig"
                    class="modal-content bg-base-200 bg-hero-pattern"
                    (closeModal)="close()"></div>
            </div>
        </div>
    }`,
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
    formModalStack$: Observable<EntityFormModel<T>[]>
    constructor(private formModalService: FormModalService<T>) {
        this.formModalStack$ = formModalService.formModalStack$
    }

    close() {
        this.formModalService.closeFormModal()
    }

    closeAllModals() {
        this.formModalService.closeAllFormModals()
    }

    /**
     * Handles the escape key press event.
     * @param event KeyboardEvent
     * @returns void
     **/
    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(event: KeyboardEvent) {
        this.close()
    }

    /**
     * Handles the overlay click event.
     * @param event Event
     * @returns void
     */
    onOverlayClick(event: Event): void {
        this.close()
    }

    /**
     * Handles the enter key press event.
     * @param event Event
     * @returns void
     */
    onKeyEnterPress(event: Event): void {
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
