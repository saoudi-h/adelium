import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { AbstractControl } from '@angular/forms'

@Component({
    standalone: true,
    selector: 'app-field-status',
    template: `
        <div class="flex flex-row items-center gap-2">
            <div class="h-6 w-6">
                <!-- valid svg -->
                <svg
                    *ngIf="check() && isValid()"
                    alt="Valid"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 w-6 text-success">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <!-- invalid svg -->
                <svg
                    *ngIf="check() && !isValid()"
                    alt="Invalid"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 w-6 text-error">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            <ng-content></ng-content>
            <div class="h-6 w-6">
                <!-- required svg  -->
                <div
                    [class]="info === '' ? '' : 'tooltip tooltip-info'"
                    attr.data-tip="{{ info }}">
                    <svg
                        *ngIf="check() && isRequired()"
                        viewBox="0 0 512 512"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        fill="currentColor"
                        stroke="currentColor"
                        class="h-6 w-6 text-error">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <g
                                id="Page-1"
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd">
                                <g
                                    id="icon"
                                    fill="currentColor"
                                    transform="translate(143.376623, 149.333333)">
                                    <polygon
                                        id="*"
                                        points="152.103896 213.333333 198.372294 180.08658 144.069264 119.411255 225.246753 103.619048 208.34632 49.3160173 131.324675 83.3939394 140.744589 2.84217094e-14 84.2251082 2.84217094e-14 93.6450216 83.3939394 16.6233766 49.3160173 0 103.619048 80.9004329 119.411255 26.5974026 180.08658 73.1428571 213.333333 112.484848 141.298701"></polygon>
                                </g>
                            </g>
                        </g>
                    </svg>
                    <svg
                        *ngIf="!isRequired() && info !== ''"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-6 w-6 text-info">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            Status
                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                </div>
            </div>
        </div>
    `,
    imports: [CommonModule],
})
export class FieldStatusComponent {
    @Input() info = ''
    @Input({ required: true }) control!: AbstractControl

    check(): boolean {
        return this.control.touched || this.control.dirty
    }
    isValid(): boolean {
        return this.control.valid
    }
    isRequired(): boolean {
        return this.check() && this.control.hasError('required')
    }
}
