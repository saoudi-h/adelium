import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { AuthService } from '@core/services/auth.service'

@Component({
  selector: 'app-nav-user',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-user.component.html',
  styles: [],
})
export class NavUserComponent implements OnInit {
  public isLoggedIn = false

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn
    })
  }

  logout() {
    this.authService.logout()
  }
}
