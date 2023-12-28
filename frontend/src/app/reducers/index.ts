import { isDevMode } from '@angular/core'
import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import {
    AuthorityState,
    authorityReducer,
} from '@store/authority/authority.reducer'
import {
    QuizDefaultState,
    quizDefaultReducer,
} from '@store/evaluation/quiz/quiz-default/quiz-default.reducer'
import {
    NotificationState,
    notificationReducer,
} from '@store/notification/notification.reducer'
import {
    RequestQueueState,
    requestQueueReducer,
} from '@store/request-queue/request-queue.reducer'
import { RoleState, roleReducer } from '@store/role/role.reducer'
import { ThemeState, themeReducer } from '@store/theme/theme.reducer'
import { UserState, userReducer } from '@store/user/user.reducer'
import { AuthState, authReducer } from './../store/auth/auth.reducer'

export interface AppState {
    theme: ThemeState
    notifications: NotificationState
    auth: AuthState
    users: UserState
    roles: RoleState
    authorities: AuthorityState
    requestQueue: RequestQueueState
    quizDefaults: QuizDefaultState
}

export const reducers: ActionReducerMap<AppState> = {
    theme: themeReducer,
    notifications: notificationReducer,
    auth: authReducer,
    users: userReducer,
    roles: roleReducer,
    authorities: authorityReducer,
    requestQueue: requestQueueReducer,
    quizDefaults: quizDefaultReducer,
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : []
