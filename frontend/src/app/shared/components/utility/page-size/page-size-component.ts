import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
    selector: '[page-size]',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="join">
            <button class="btn btn-outline join-item" (click)="decrement()">
                «
            </button>
            <input
                type="number"
                [(ngModel)]="size"
                (change)="onChange()"
                class="input join-item input-bordered max-w-[5rem] border-base-content bg-base-200" />
            <button class="btn btn-outline join-item" (click)="increment()">
                »
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
