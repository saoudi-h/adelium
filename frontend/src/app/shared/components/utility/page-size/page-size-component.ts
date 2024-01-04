import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { AddIconComponent } from '@shared/components/icons/add-icon.component'
import { MinusIconComponent } from '@shared/components/icons/minus-icon.component'

@Component({
    selector: '[page-size]',
    standalone: true,
    imports: [CommonModule, FormsModule, MinusIconComponent, AddIconComponent],
    template: `
        <div class="join">
            <button class="btn btn-outline join-item" (click)="decrement()">
                <div minus-icon className="h-5 w-5"></div>
            </button>
            <input
                type="number"
                [(ngModel)]="size"
                (change)="onChange()"
                class="input join-item input-bordered max-w-[5rem] border-base-content bg-base-200 text-center font-semibold" />
            <button class="btn btn-outline join-item" (click)="increment()">
                <div add-icon className="h-5 w-5"></div>
            </button>
        </div>
    `,
})
export class PageSizeComponent {
    @Output() sizeChange = new EventEmitter<number>()
    @Input() size: number = 10
    constructor() {}

    onChange() {
        this.sizeChange.emit(this.size)
    }
    increment() {
        this.size++
        this.onChange()
    }
    decrement() {
        this.size--
        this.onChange()
    }
}
