import { CommonModule } from '@angular/common'
import {
    Component,
    ElementRef,
    HostListener,
    Input,
    ViewChild,
} from '@angular/core'
import { dropdownAnimation } from './dropdown.animations'

@Component({
    imports: [CommonModule],
    standalone: true,
    selector: 'app-dropdown',
    template: `
        <div
            #dropdown
            class="dropdown-container relative"
            [style]="{ width: width }">
            <ng-content select="[dropdown-button]"></ng-content>
            <div
                [@dropdown]="isOpen ? 'open' : 'closed'"
                class="dropdown-content absolute z-10"
                [ngStyle]="{
                    left: left ? '0' : 'auto',
                    right: left ? 'auto' : '0'
                }">
                <ng-content select="[dropdown-content]"></ng-content>
            </div>
        </div>
    `,
    animations: [dropdownAnimation],
})
export class DropdownComponent {
    @ViewChild('dropdown') dropdown!: ElementRef
    @Input() left: boolean = false
    @Input() width: string = 'auto'
    isOpen = false

    toggleDropdown() {
        this.isOpen = !this.isOpen
    }

    closeDropdown() {
        this.isOpen = false
    }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler() {
        this.closeDropdown()
    }

    @HostListener('document:click', ['$event.target'])
    onClickHandler(targetElement: EventTarget) {
        if (
            this.isOpen &&
            !this.dropdown.nativeElement.contains(targetElement)
        ) {
            this.closeDropdown()
        }
    }
}
