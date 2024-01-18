import { Component, Input } from '@angular/core'

@Component({
    selector: '[training-icon]',
    standalone: true,
    template: `<svg
        version="1.1"
        id="Icons"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 32 32"
        xml:space="preserve"
        height="100%"
        width="100%"
        class="{{ className }}"
        fill="currentColor">
        <style type="text/css">
            .st0 {
                fill: none;
                stroke: currentColor;
                stroke-width: 2;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-miterlimit: 10;
            }
        </style>
        <polygon class="st0" points="16,4 1,12 16,20 31,12 "></polygon>
        <path
            class="st0"
            d="M7,15.2V22c0,2.2,4,5,9,5c5,0,9-2.8,9-5v-6.8"></path>
        <line class="st0" x1="31" y1="12" x2="31" y2="25"></line>
    </svg>`,
})
export class TrainingIconComponent {
    @Input() className = ''
}
