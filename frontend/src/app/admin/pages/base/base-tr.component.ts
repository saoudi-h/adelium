import { FormField } from '@admin/forms/forms.types'
import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Identifiable } from '@core/entity/identifiable.interface'
import { SharedModule } from '@shared/shared.module'
import { ActionEntityComponent } from './components/action-entity.component'
import { CheckBoxtDisplayComponent } from './components/field-display/checkbox-dislay.component'
import { DateDisplayComponent } from './components/field-display/date-dislay.component'
import { DynamicSelectDisplayComponent } from './components/field-display/dynamic-select-display.component'
import { ImageDisplayComponent } from './components/field-display/image-dislay.component'
import { MultiDynamicSelectDisplayComponent } from './components/field-display/multi-dynamic-select-display.component'
import { TextDisplayComponent } from './components/field-display/text-dislay.component'
import { TitleDisplayComponent } from './components/field-display/title-dislay.component'
@Component({
    selector: '[base-tr]',
    standalone: true,
    imports: [
        CommonModule,
        SharedModule,
        ActionEntityComponent,
        TextDisplayComponent,
        TitleDisplayComponent,
        DateDisplayComponent,
        CheckBoxtDisplayComponent,
        ImageDisplayComponent,
        DynamicSelectDisplayComponent,
        MultiDynamicSelectDisplayComponent,
    ],
    template: `
        <td class="h-px w-px whitespace-nowrap">
            <label>
                <input type="checkbox" class="checkbox" />
            </label>
        </td>
        <!-- tds -->
        @for (field of fields; track field) {
            <td>
                @switch (field.type.name) {
                    @case ('input') {
                        @switch (field.type.option) {
                            @case ('title') {
                                <div
                                    title-display
                                    [content]="entity[field.id]"
                                    [field]="field"></div>
                            }
                            @default {
                                <div
                                    text-display
                                    [content]="entity[field.id]"
                                    [field]="field"></div>
                            }
                        }
                    }
                    @case ('date') {
                        <deiv
                            date-display
                            [content]="entity[field.id]"
                            [field]="field"></deiv>
                    }
                    @case ('checkbox') {
                        <div
                            checkbox-display
                            [content]="entity[field.id]"
                            [field]="field"></div>
                    }
                    @case ('image') {
                        <div
                            image-display
                            [content]="entity[field.id]"
                            [field]="field"></div>
                    }
                    @case ('dynamic-select') {
                        @if (field.type.option === 'multiple') {
                            <div
                                multi-dynamic-select-display
                                [id]="entity.id"
                                [field]="field"></div>
                        } @else {
                            <div
                                dynamic-select-display
                                [content]="entity[field.id]"
                                [field]="field"></div>
                        }
                    }
                    @default {
                        <div
                            text-display
                            [content]="entity[field.id]"
                            [field]="field"></div>
                    }
                }
            </td>
        }
        <!-- Actions -->
        <td
            action-entity
            [id]="entity.id"
            (delete)="onDelete($event)"
            (edit)="onEdit($event)"
            class="flex items-center justify-end"></td>
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
}
