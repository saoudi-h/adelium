import { Component, EventEmitter, Input, Output } from '@angular/core'
import { DeleteIconComponent } from '@shared/components/icons/delete-icon.component'
import { EditIconComponent } from '@shared/components/icons/edit-icon.component'

@Component({
    selector: 'td[action-entity]',
    standalone: true,
    imports: [DeleteIconComponent, EditIconComponent],
    template: `<div class="join join-vertical md:join-horizontal">
        <button
            (click)="onEdit(id)"
            class="btn btn-square btn-outline join-item tooltip flex"
            data-tip="Modifier">
            <div edit-icon className="h-6 w-6"></div>
        </button>
        <button
            (click)="onDelete(id)"
            class="btn btn-square btn-outline join-item tooltip flex hover:btn-error hover:text-error"
            data-tip="Supprimer">
            <div delete-icon className="h-6 w-6"></div>
        </button>
    </div>`,
})
export class ActionEntityComponent {
    @Input() id!: number
    @Output() delete = new EventEmitter<number>()
    @Output() edit = new EventEmitter<number>()

    onDelete(id: number) {
        this.delete.emit(id)
    }

    onEdit(id: number) {
        this.edit.emit(id)
    }
}
