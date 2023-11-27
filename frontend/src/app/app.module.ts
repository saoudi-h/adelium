import { ThemeService } from '@/core/services/theme.service'
import { HttpClientModule } from '@angular/common/http'
import { NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ServiceWorkerModule } from '@angular/service-worker'
import { NotificationService } from '@core/services/notification.service'
import { HomeModule } from '@home/home.module'
import { CustomToastComponent } from '@shared/components/widgets/notificator/custom-toast.component'
import { ToastrModule } from 'ngx-toastr'
import { AdminModule } from './admin/admin.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        AdminModule,
        HomeModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            toastComponent: CustomToastComponent,
            positionClass: 'inline',
        }),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }),
    ],
    providers: [ThemeService, NotificationService],
    bootstrap: [AppComponent],
})
export class AppModule {}
