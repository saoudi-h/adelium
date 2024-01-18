import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { RouterLink } from '@angular/router'
import { DropdownComponent } from '@shared/components/utility/dropdown/dropdown.component'
import { MenuNodeComponent } from './menu-node.component'
import { MenuNode } from './nav-menu.component'

@Component({
    selector: 'ul[menu-recursive]',
    imports: [CommonModule, RouterLink, DropdownComponent, MenuNodeComponent],
    template: `
        @for (node of menu; track node) {
            <li menu-node [node]="node">
                @if (node.hasSubMenu && node.subMenu) {
                    <ul
                        menu-recursive
                        [menu]="node.subMenu"
                        subMenu
                        class="mt-4 w-96 rounded-2xl border border-base-100 bg-base-300 p-2 shadow-xl"></ul>
                }
            </li>
        }
    `,
    standalone: true,
})
export class MenuRecursiveComponent {
    @Input() menu!: MenuNode[]
}
