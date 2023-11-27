import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'

@Component({
    standalone: true,
    selector: '[logo-widget]',
    imports: [RouterLink],
    template: ` <a routerLink="/" class="flex items-center text-lg font-black"
        >Adelium</a
    >`,
})
export class LogoWidgetComponent {}
