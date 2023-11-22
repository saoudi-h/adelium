import { Component, Input } from '@angular/core'

@Component({
    selector: 'app-youtube',
    standalone: true,
    template: ` <svg
        fill="currentColor"
        height="100%"
        width="100%"
        class="{{ className }}"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="-143 145 512 512"
        xml:space="preserve">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <g>
                <polygon points="78.9,450.3 162.7,401.1 78.9,351.9 "></polygon>
                <path
                    d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M241,446.8L241,446.8 c0,44.1-44.1,44.1-44.1,44.1H29.1c-44.1,0-44.1-44.1-44.1-44.1v-91.5c0-44.1,44.1-44.1,44.1-44.1h167.8c44.1,0,44.1,44.1,44.1,44.1 V446.8z"></path>
            </g>
        </g>
    </svg>`,
})
export class YoutubeComponent {
    @Input({ required: true }) className = ''
}