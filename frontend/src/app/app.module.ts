import { ThemeService } from '@/core/services/theme.service'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AdminModule } from './admin/admin.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeLayoutComponent } from './home/home-layout.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AdminModule, HomeLayoutComponent],
  providers: [ThemeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
