import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { SvgLoginComponent } from './svg-login.component'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, SvgLoginComponent],
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {}
