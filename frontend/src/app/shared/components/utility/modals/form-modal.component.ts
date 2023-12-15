import { FormModalService } from '@core/services/formModal.service'
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckBoxFieldComponent } from '@admin/forms/checkbox/checkbox-field.component'
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
import { Component, HostListener, Type } from '@angular/core'
import { Identifiable } from '@core/entity/identifiable.interface'
import { IconService } from '@core/services/icon.service'
import { SharedModule } from '@shared/shared.module'
import { Observable } from 'rxjs'

@Component({
    standalone: true,
    imports: [
        CommonModule,
        SharedModule,
        InputFieldComponent,
        CheckBoxFieldComponent,
        SelectFieldComponent,
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
            class="fixed inset-0 left-0 top-0 z-[1000] m-0 flex h-screen w-screen items-center justify-center overflow-hidden overflow-y-hidden bg-base-300/20 p-0 backdrop-blur-sm">
            <div
                class="modal-box transform-none "
                (click)="onModalClick($event)"
                (keyup.enter)="onModalClick($event)"
                tabindex="0">
                <div class="modal-content">
                    <!-- Votre contenu de modal ici -->
                    <h3 class="text-3xl font-bold">{{ modalConfig.title }}</h3>
                    <p class="text-sm">{{ modalConfig.additionalInfo }}</p>
                    <!-- Formulaires et autres éléments -->

                    <!-- Champs de formulaire -->
                    @for (field of modalConfig.fields; track field) {
                        @if (field.type.name === 'input') {
                            <div
                                input-field
                                class="form-control w-full max-w-xs"
                                [field]="field"
                                [initialValue]="
                                    modalConfig?.initialValue?.[field.id]
                                "></div>
                        } @else if (field.type.name === 'select') {
                            <div
                                select-field
                                class="form-control w-full max-w-xs"
                                [field]="field"
                                [initialValue]="
                                    modalConfig?.initialValue?.[field.id]
                                "></div>
                        } @else if (field.type.name === 'checkbox') {
                            <label class="form-control w-full max-w-xs">
                                <div class="label">
                                    <span
                                        class="label-text"
                                        [attr.for]="field.id"
                                        >{{ field.label }}</span
                                    >
                                </div>
                                <input
                                    [id]="field.id"
                                    type="checkbox"
                                    [checked]="
                                        modalConfig?.initialValue?.[field.id]
                                            ? modalConfig?.initialValue?.[
                                                  field.id
                                              ]
                                            : false
                                    "
                                    class="checkbox-primary checkbox" />
                            </label>
                        }
                    }

                    <!-- Boutons pour fermer ou confirmer -->
                    <div class="modal-action">
                        @for (action of modalConfig.actions; track action) {
                            <button
                                [type]="action.type"
                                (click)="action.action()"
                                class="btn"
                                [ngClass]="getColorClass(action.color)">
                                @if (action.icon) {
                                    <div class="mr-2 h-6 w-6">
                                        <ng-container
                                            *ngComponentOutlet="
                                                getIconComponent(action.icon)
                                            " />
                                    </div>
                                }
                                <span>{{ action.label }}</span>
                            </button>
                        }
                        <button (click)="close()">Fermer</button>
                    </div>
                </div>
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
    constructor(
        private formModalService: FormModalService<T>,
        private iconService: IconService
    ) {
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

    /**
     * Returns the color class for the button.
     * @param color string
     * @returns string
     */
    getColorClass(color: string | undefined): string {
        return color ? `btn-${color}` : 'btn-primary'
    }
    getIconComponent(iconName: string): Type<unknown> | null {
        return this.iconService.getIconComponent(iconName)
    }
}
