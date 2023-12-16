import { FormField } from '@admin/forms/forms.types'
import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Identifiable } from '@core/entity/identifiable.interface'
import { SharedModule } from '@shared/shared.module'
import { ActionEntityComponent } from './components/action-entity.component'
import { CheckBoxtDisplayComponent } from './components/field-display/checkbox-dislay.component'
import { DateDisplayComponent } from './components/field-display/date-dislay.component'
import { TextDisplayComponent } from './components/field-display/text-dislay.component'
@Component({
    selector: '[base-tr]',
    standalone: true,
    imports: [CommonModule, SharedModule, ActionEntityComponent],
    template: `
        <td class="h-px w-px whitespace-nowrap">
            <label>
                <input type="checkbox" class="checkbox" />
            </label>
        </td>
        <!-- tds -->
        @for (field of fields; track field) {
            <td>
                <ng-container
                    *ngComponentOutlet="
                        getComponent(field);
                        inputs: { content: entity[field.id] }
                    "></ng-container>
            </td>
        }
        <!-- Actions -->
        <td
            action-entity
            [id]="entity.id"
            (delete)="onDelete($event)"
            (edit)="onEdit($event)"
            class="flex justify-end"></td>
    `,
})
export class BaseTrComponent<T extends Identifiable> {
    @Input() fields!: FormField[]
    @Input() entity!: T
    @Output() delete = new EventEmitter<number>()
    @Output() edit = new EventEmitter<number>()

    onDelete(id: number) {
        this.delete.emit(id)
    }

    onEdit(id: number) {
        this.edit.emit(id)
    }

    getComponent(field: FormField) {
        if (field.type.name === 'input') {
            return TextDisplayComponent
        } else if (field.type.name === 'date') {
            return DateDisplayComponent
        } else if (field.type.name === 'checkbox') {
            return CheckBoxtDisplayComponent
        } else {
            throw new Error(`Unknown type ${field.type.name}`)
        }
    }
}
