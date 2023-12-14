import { EntityFormModel } from '@admin/forms/forms.types'
import { Injectable } from '@angular/core'
import { Identifiable } from '@core/entity/identifiable.interface'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class FormModalService<T extends Identifiable> {
    private formModalStack = new BehaviorSubject<EntityFormModel<T>[]>([])

    get formModalStack$(): Observable<EntityFormModel<T>[]> {
        return this.formModalStack.asObservable()
    }

    openFormModal(config: EntityFormModel<T>): void {
        const currentStack = this.formModalStack.value
        this.formModalStack.next([...currentStack, config])
    }

    closeFormModal(): void {
        const currentStack = this.formModalStack.value
        if (currentStack.length > 0) {
            this.formModalStack.next(currentStack.slice(0, -1))
        }
    }

    closeAllFormModals(): void {
        this.formModalStack.next([])
    }
}
