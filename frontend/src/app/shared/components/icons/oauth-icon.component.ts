import { Component, Input } from '@angular/core'

@Component({
    selector: '[oauth-icon]',
    standalone: true,
    template: `<svg
        fill="currentColor"
        height="100%"
        width="100%"
        class="{{ className }}"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <path
            d="M29.307 9.932l-3.146-9.932h-20.365l-3.104 9.932c-1.802 5.75 0.042 12.271 5.089 16.021l8.229 6.047 8.208-6.068c5.005-3.75 6.911-10.25 5.089-16.021l-8.214 6.104 3.12 9.938-8.208-6.13-8.208 6.104 3.141-9.911-8.25-6.063 10.177-0.063 3.146-9.891 3.141 9.87z"></path>
    </svg>`,
})
export class OauthIconComponent {
    @Input() className = ''
}
