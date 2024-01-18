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
                [@dropdown]="{
                    value: isOpen ? 'open' : 'closed',
                    params: {
                        closeDuration: closeDuration,
                        openDuration: openDuration
                    }
                }"
                class="dropdown-content absolute z-10"
                [style.display]="displayStyle"
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
    @Input() closeDuration: number = 400
    @Input() openDuration: number = 400
    displayStyle: string = 'none'
    private _isOpen = false
    get isOpen() {
        return this._isOpen
    }
    set isOpen(value: boolean) {
        this._isOpen = value
        if (this._isOpen) {
            this.displayStyle = 'block'
        } else {
            setTimeout(() => {
                this.displayStyle = 'none'
            }, this.closeDuration)
        }
    }

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
