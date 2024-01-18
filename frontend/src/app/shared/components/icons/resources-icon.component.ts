import { Component, Input } from '@angular/core'

@Component({
    selector: '[resources-icon]',
    standalone: true,
    template: `<svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        height="100%"
        width="100%"
        class="{{ className }}"
        xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="3" width="20" height="9" rx="2" stroke-width="2"></rect>
        <path
            d="M16 18V18C16 19.1046 15.1046 20 14 20H10C8.89543 20 8 19.1046 8 18V18"
            stroke-width="2"></path>
        <path
            d="M19 14V14C19 15.1046 18.1046 16 17 16H7C5.89543 16 5 15.1046 5 14V14"
            stroke-width="2"></path>
    </svg>`,
})
export class ResourcesIconComponent {
    @Input() className = ''
}
