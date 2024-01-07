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
import { AuthEffects } from '@store/auth/auth.effects'
import { AuthorityEffects } from '@store/entities/auth/authority/authority.effects'
import { RoleEffects } from '@store/entities/auth/role/role.effects'
import { UserEffects } from '@store/entities/auth/user/user.effects'
import { BankDefaultEffects } from '@store/entities/evaluation/bank/bank-default/bank-default.effects'
import { MediaBooleanEffects } from '@store/entities/evaluation/media/media-boolean/media-boolean.effects'
import { MediaTextEffects } from '@store/entities/evaluation/media/media-text/media-text.effects'
import { OptionMcqEffects } from '@store/entities/evaluation/option/question-mcq/option-mcq.effects'
import { OptionTrueFalseEffects } from '@store/entities/evaluation/option/question-true-false/option-true-false.effects'
import { QuestionMcqEffects } from '@store/entities/evaluation/question/question-mcq/question-mcq.effects'
import { QuestionTrueFalseEffects } from '@store/entities/evaluation/question/question-true-false/question-true-false.effects'
import { QuizDefaultEffects } from '@store/entities/evaluation/quiz/quiz-default/quiz-default.effects'
import { QuizMcqEffects } from '@store/entities/evaluation/quiz/quiz-mcq/quiz-mcq.effects'
import { TagEffects } from '@store/entities/evaluation/tag/tag.effects'
import { NotificationEffects } from '@store/notification/notification.effects'
import { RequestQueueEffects } from '@store/request-queue/request-queue.effects'
import { ThemeEffects } from '@store/theme/theme.effects'
import { ToastrModule } from 'ngx-toastr'
import { AdminModule } from './admin/admin.module'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AppEffects } from './app.effects'
import { metaReducers, reducers } from './reducers'
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
        EffectsModule.forRoot([
            AppEffects,
            ThemeEffects,
            NotificationEffects,
            AuthEffects,
            UserEffects,
            RoleEffects,
            AuthorityEffects,
            RequestQueueEffects,
            QuizDefaultEffects,
            QuizMcqEffects,
            BankDefaultEffects,
            TagEffects,
            QuestionMcqEffects,
            QuestionTrueFalseEffects,
            OptionTrueFalseEffects,
            OptionMcqEffects,
            MediaTextEffects,
            MediaBooleanEffects,
        ]),
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
