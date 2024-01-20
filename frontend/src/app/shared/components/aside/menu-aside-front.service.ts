import { Injectable } from '@angular/core'

/**
 * Service for managing the state of the front menu items in the aside menu.
 */
@Injectable({ providedIn: 'root' })
export class MenuAsideFrontService {
    isDirty(): boolean {
        return Object.entries(this.states).some(([, value]) => value)
    }
    private states: { [id: string]: boolean } = {}
    closeAll() {
        this.states = {}
    }

    isOpen(id: string): boolean {
        return this.states[id] || false
    }

    toggle(id: string, isOpen: boolean): void {
        this.states[id] = isOpen
    }
}
