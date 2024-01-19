import { Component, Input } from '@angular/core'
import { MenuRecursiveComponent } from './menu-recursive.component'

export interface MenuNode {
    id: string
    label: string
    type: 'button' | 'internal-link' | 'external-link' | 'category'
    icon?: string
    hasSubMenu: boolean
    action?: () => void
    url?: string
    tooltip?: string
    subMenu?: MenuNode[]
}

@Component({
    selector: '[nav-menu]',
    imports: [MenuRecursiveComponent],
    template: `<ul menu-recursive [menu]="menu" class="flex"></ul>`,
    standalone: true,
})
export class NavMenuComponent {
    @Input({ required: true }) menu!: MenuNode[]
}
