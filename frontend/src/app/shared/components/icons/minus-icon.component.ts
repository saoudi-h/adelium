import { Component, Input } from '@angular/core'

@Component({
    selector: '[minus-icon]',
    standalone: true,
    template: `<svg
        fill="currentColor"
        viewBox="0 0 32 32"
        version="1.1"
        height="100%"
        width="100%"
        class="{{ className }}"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M16 0c8.844 0 16 7.156 16 16s-7.156 16-16 16-16-7.156-16-16 7.156-16 16-16zM16 30.031c7.719 0 14-6.313 14-14.031s-6.281-14-14-14-14 6.281-14 14 6.281 14.031 14 14.031zM14.906 17h-5.906c-0.563 0-1-0.438-1-1s0.438-1 1-1h14c0.563 0 1 0.438 1 1s-0.438 1-1 1h-8.094z"></path>
    </svg>`,
})
export class MinusIconComponent {
    @Input() className = ''
}
