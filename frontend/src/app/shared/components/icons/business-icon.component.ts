import { Component, Input } from '@angular/core'

@Component({
    selector: '[business-icon]',
    standalone: true,
    template: `<svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor">
        <defs>
            <style>
                .cls-1,
                .cls-2 {
                    fill: none;
                    stroke: currentColor;
                    stroke-miterlimit: 10;
                    stroke-width: 1.91px;
                }
                .cls-1 {
                    stroke-linecap: square;
                }
            </style>
        </defs>
        <g id="briefcase_simple" data-name="briefcase simple">
            <rect
                class="cls-1"
                x="1.5"
                y="6.27"
                width="21"
                height="15.27"
                rx="1.91"></rect>
            <path
                class="cls-2"
                d="M13.91,13h4.77A3.81,3.81,0,0,0,22.5,9.14v-1a1.91,1.91,0,0,0-1.91-1.91H3.41A1.91,1.91,0,0,0,1.5,8.18v1A3.81,3.81,0,0,0,5.32,13h8.59Z"></path>
            <line class="cls-1" x1="12" y1="12" x2="12" y2="13.91"></line>
            <polygon
                class="cls-1"
                points="15.82 6.27 8.18 6.27 9.14 2.46 14.86 2.46 15.82 6.27"></polygon>
        </g>
    </svg>`,
})
export class BusinessIconComponent {
    @Input() className = ''
}