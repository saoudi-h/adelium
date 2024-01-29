import { TestBed } from '@angular/core/testing'

import { Injector } from '@angular/core'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import * as NotificationActions from '@store/notification/notification.actions'
import { ToastrService } from 'ngx-toastr'
import { of } from 'rxjs'
import { NotificationService } from './notification.service'

describe('NotificationService', () => {
    let service: NotificationService
    let store: MockStore
    let toastrMock: any
    const initialState = { loggedIn: false }
    const activatedRouteMock = {
        queryParams: of({}),
        params: of({}),
    }

    beforeEach(() => {
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
        // service = new NotificationService(store, toastrMock as any)

        TestBed.configureTestingModule({
            providers: [
                provideMockStore({ initialState }),
                { provide: ToastrService, useValue: toastrMock },
            ],
        })

        const injector = Injector.create({
            providers: [provideMockStore({ initialState })],
        })
        store = injector.get(MockStore)
        spyOn(store, 'dispatch').and.callThrough()
        service = new NotificationService(store, toastrMock as any)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('should dispatch notification and call toastr success on success method call', () => {
        service.success('Success Title', 'Success Message')
        expect(store.dispatch).toHaveBeenCalled()
        expect(toastrMock.success).toHaveBeenCalledWith(
            'Success Message',
            'Success Title',
            jasmine.any(Object)
        )
    })

    it('should dispatch notification and call toastr error on error method call', () => {
        service.error('Error Title', 'Error Message')
        expect(store.dispatch).toHaveBeenCalled()
        expect(toastrMock.error).toHaveBeenCalledWith(
            'Error Message',
            'Error Title',
            jasmine.any(Object)
        )
    })

    it('should dispatch notification and call toastr info on info method call', () => {
        service.info('Info Title', 'Info Message')
        expect(store.dispatch).toHaveBeenCalled()
        expect(toastrMock.info).toHaveBeenCalledWith(
            'Info Message',
            'Info Title',
            jasmine.any(Object)
        )
    })

    it('should dispatch notification and call toastr warning on warning method call', () => {
        service.warning('Warning Title', 'Warning Message')
        expect(store.dispatch).toHaveBeenCalled()
        expect(toastrMock.warning).toHaveBeenCalledWith(
            'Warning Message',
            'Warning Title',
            jasmine.any(Object)
        )
    })

    it('should dispatch resetNotifications action on reset method call', () => {
        service.reset()
        expect(store.dispatch).toHaveBeenCalledWith(
            NotificationActions.resetNotifications()
        )
    })
})
