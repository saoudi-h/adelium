import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute, Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { NotificationService } from '@core/services/notification.service'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { providersMap } from '@store/auth/oauth2/providers-map'
import { ToastrService } from 'ngx-toastr'
import { of } from 'rxjs'
import { OauthCallbackComponent } from './oauth-callback.component'
describe('OauthCallbackComponent', () => {
    let component: OauthCallbackComponent
    let fixture: ComponentFixture<OauthCallbackComponent>
    let store: MockStore
    let toastrMock: any
    let notificationServiceMock: any
    const providerConfig = providersMap['google' as keyof typeof providersMap]
    const initialState = { loggedIn: false }
    const activatedRouteMock = {
        queryParams: of({}),
        params: of({}),
        fragment: of({}),
    }

    beforeEach(async () => {
        activatedRouteMock.params = of({ provider: 'google' })
        activatedRouteMock.fragment = of('fragment')
        ;(activatedRouteMock.queryParams = of('access_token=token123')),
            (notificationServiceMock = {
                success: jasmine.createSpy('success').and.callThrough(),
                error: jasmine.createSpy('error').and.callThrough(),
                info: jasmine.createSpy('info').and.callThrough(),
                warning: jasmine.createSpy('warning').and.callThrough(),
                reset: jasmine.createSpy('reset').and.callThrough(),
            })

        toastrMock = {
            success: jasmine.createSpy('success').and.returnValue({
                onTap: of({}),
                onHidden: of({}),
            }),
            error: jasmine.createSpy('error').and.returnValue({
                onTap: of({}),
                onHidden: of({}),
            }),
            info: jasmine.createSpy('info').and.returnValue({
                onTap: of({}),
                onHidden: of({}),
            }),
            warning: jasmine.createSpy('warning').and.returnValue({
                onTap: of({}),
                onHidden: of({}),
            }),
        }
        await TestBed.configureTestingModule({
            imports: [OauthCallbackComponent, RouterTestingModule],
            providers: [
                { provide: ToastrService, useValue: toastrMock },
                { provide: ActivatedRoute, useValue: activatedRouteMock },
                Router,
                provideMockStore({ initialState }),
                {
                    provider: NotificationService,
                    useValue: notificationServiceMock,
                },
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(OauthCallbackComponent)
        component = fixture.componentInstance
        store = TestBed.inject(MockStore)
        spyOn(store, 'dispatch').and.callThrough()
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should get provider from route params and set initial state', () => {
        component.ngOnInit()
        expect(component.provider).toBe('google')
        expect(component.isLoading).toBeTruthy()
    })

    // it('should dispatch loginRedirectSuccess when access token is received', () => {
    //     component.ngOnInit()
    //     expect(store.dispatch).toHaveBeenCalled()
    // })
})
