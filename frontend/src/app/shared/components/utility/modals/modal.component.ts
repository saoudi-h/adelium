/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    animate,
    group,
    keyframes,
    query,
    style,
    transition,
    trigger,
} from '@angular/animations'
import { Component, HostListener } from '@angular/core'
import { ModalData, ModalService } from '@core/services/modal.service'
import { Observable } from 'rxjs'

/**
 * Represents a modal component that displays a modal dialog.
 */
@Component({
    selector: 'app-modal',
    template: ` @if (modalData$ | async; as modalData) {
        <dialog
            [@dialog]
            (click)="onOverlayClick($event)"
            (keyup.enter)="onKeyEnterPress($event)"
            tabindex="0"
            class="fixed inset-0 left-0 top-0 z-[1000] m-0 flex h-screen w-screen items-center justify-center overflow-hidden overflow-y-hidden bg-base-300/20 p-0 backdrop-blur-sm">
            <div
                class="modal-box transform-none "
                (click)="onModalClick($event)"
                (keyup.enter)="onModalClick($event)"
                tabindex="0">
                <h3 class="text-lg font-bold">{{ modalData.title }}</h3>
                <p class="py-4">{{ modalData.message }}</p>
                <div class="modal-action">
                    <div
                        *ngIf="modalData.type === 'confirmation'"
                        class="flex flex-row gap-4">
                        <button
                            (click)="close()"
                            *ngIf="!modalData.isClosable"
                            class="btn btn-outline btn-primary">
                            {{ modalData.cancelLabel || 'Annuler' }}
                        </button>
                        <button (click)="confirm()" class="btn btn-primary">
                            {{ modalData.confirmLabel || 'Confirmer' }}
                        </button>
                    </div>
                    <div *ngIf="modalData.type === 'info'">
                        <button (click)="close()">
                            {{ modalData.confirmLabel || 'OK' }}
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    }`,
    animations: [
        trigger('dialog', [
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
export class ModalComponent {
    modalData$!: Observable<ModalData | null>

    constructor(private modalService: ModalService) {
        this.modalData$ = this.modalService.modalData$
    }

    /**
     * Closes the modal dialog.
     * @returns void
     **/
    close() {
        this.modalService.closeModal()
    }

    /**
     * Confirms the modal dialog.
     * @returns void
     **/
    confirm() {
        this.modalService.confirm()
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
