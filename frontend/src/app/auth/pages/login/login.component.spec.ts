import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormBuilder } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { of } from 'rxjs'
import { LoginComponent } from './login.component'
describe('LoginComponent', () => {
    let component: LoginComponent
    let fixture: ComponentFixture<LoginComponent>
    let store: MockStore
    const initialState = { loggedIn: false }
    const activatedRouteMock = {
        queryParams: of({}),
        params: of({}),
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LoginComponent, RouterTestingModule],
            providers: [
                provideMockStore({ initialState }),
                FormBuilder,
                { provide: ActivatedRoute, useValue: activatedRouteMock },
                Router,
            ],
        }).compileComponents()

        fixture = TestBed.createComponent(LoginComponent)
        component = fixture.componentInstance
        store = TestBed.inject(MockStore)
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should create a form with username and password fields', () => {
        expect(component.loginForm.contains('username')).toBeTruthy()
        expect(component.loginForm.contains('password')).toBeTruthy()
    })

    it('should dispatch login action on submit for valid form', () => {
        spyOn(store, 'dispatch')

        component.loginForm.setValue({
            username: 'test@example.com',
            password: 'password123',
        })
        component.onSubmit()

        expect(store.dispatch).toHaveBeenCalled()
    })

    it('should not dispatch login action on submit for invalid form', () => {
        spyOn(store, 'dispatch')

        component.loginForm.setValue({
            username: 'not an email',
            password: 'password123',
        })
        component.onSubmit()
        expect(store.dispatch).not.toHaveBeenCalled()
    })

    it('should dispatch google login action on click', () => {
        spyOn(store, 'dispatch')
        component.googleLogin()
        expect(store.dispatch).toHaveBeenCalled()
    })

    it('should dispatch github login action on click', () => {
        spyOn(store, 'dispatch')
        component.githubLogin()
        expect(store.dispatch).toHaveBeenCalled()
    })
})
