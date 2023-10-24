import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { SvgRegisterComponent } from './svg-register.component'

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, SvgRegisterComponent],
    templateUrl: './register.component.html',
    styles: [],
})
export class RegisterComponent {}
