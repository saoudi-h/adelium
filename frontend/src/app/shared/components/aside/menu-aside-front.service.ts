import { Injectable } from '@angular/core'

/**
 * Service for managing the state of the front menu items in the aside menu.
 */
@Injectable({ providedIn: 'root' })
export class MenuAsideFrontService {
    private states: { [id: string]: boolean } = {}

    isOpen(id: string): boolean {
        return this.states[id] || false
    }

    toggle(id: string, isOpen: boolean): void {
        this.states[id] = isOpen
    }
}
