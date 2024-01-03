import { CommonModule } from '@angular/common'
import { Component, ElementRef, Input, ViewChild } from '@angular/core'

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'image-display',
    template: `
        <button class="cursor-default" (click)="show($event)">
            <div class="avatar">
                <div class="w-16 rounded md:w-24 lg:w-32">
                    <img
                        [ngClass]="{ 'cursor-pointer': wideView }"
                        class="h-auto max-w-lg rounded-lg grayscale filter transition-all duration-300 hover:grayscale-0"
                        src="{{ content }}"
                        alt="image description" />
                </div>
            </div>
        </button>
        <dialog id="my_modal_2" class="modal" #myModal>
            <div class="modal-box">
                <div class="avatar">
                    <img
                        class="h-auto max-w-lg rounded transition-all duration-300"
                        src="{{ content }}"
                        alt="image description" />
                </div>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    `,
})
export class ImageDisplayComponent {
    show($event: MouseEvent) {
        $event.preventDefault()
        if (!this.wideView) return
        this.myModal.nativeElement.showModal()
    }
    @ViewChild('myModal') myModal!: ElementRef
    @Input() wideView: boolean = true
    @Input() content!: string
    constructor() {}
}
