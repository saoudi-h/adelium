import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

export interface ModalData {
    type: 'confirmation' | 'info' | 'custom'
    title?: string
    message?: string
    confirmLabel?: string
    cancelLabel?: string
    isClosable?: boolean
    onConfirm?: () => void
}

@Injectable({
    providedIn: 'root',
})
/**
 * Service for managing modals.
 */
export class ModalService {
    private modalDataSubject = new BehaviorSubject<ModalData | null>(null)

    /**
     * Observable that emits the current modal data.
     * @returns The current modal data.
     */
    get modalData$(): Observable<ModalData | null> {
        return this.modalDataSubject.asObservable()
    }

    /**
     * Executes the onConfirm callback of the current modal data (if available) and closes the modal.
     * @returns void
     */
    confirm() {
        const currentData = this.modalDataSubject.value
        if (currentData?.onConfirm) {
            currentData.onConfirm()
        }
        this.closeModal()
    }

    /**
     * Opens the modal with the specified data and disables body scrolling.
     * @param data The data to be displayed in the modal.
     */
    openModal(data: ModalData) {
        document.body.style.overflow = 'hidden'
        this.modalDataSubject.next(data)
    }

    /**
     * Closes the modal and enables body scrolling.
     * @returns void
     */
    closeModal() {
        document.body.style.overflow = 'auto'
        this.modalDataSubject.next(null)
    }
}
