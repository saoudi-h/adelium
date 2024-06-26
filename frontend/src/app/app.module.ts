import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule, isDevMode } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ServiceWorkerModule } from '@angular/service-worker'
import { RefreshInterceptor } from '@core/interceptors/refresh.interceptor'
import { RequestInterceptor } from '@core/interceptors/request.interceptor'
import { NotificationService } from '@core/services/notification.service'
import { HomeModule } from '@home/home.module'
import { NgSelectModule } from '@ng-select/ng-select'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { CustomToastComponent } from '@shared/components/widgets/notificator/custom-toast.component'
import { ToastrModule } from 'ngx-toastr'
import { AdminModule } from './admin/admin.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { effects, metaReducers, reducers } from './reducers'
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        AdminModule,
        HomeModule,
        BrowserAnimationsModule,
        NgSelectModule,
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
        StoreRouterConnectingModule.forRoot(),
        EffectsModule.forRoot(effects),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
        StoreModule.forRoot(reducers, { metaReducers }),
        StoreDevtoolsModule.instrument({ logOnly: isDevMode() }),
    ],
    providers: [
        NotificationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RefreshInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
