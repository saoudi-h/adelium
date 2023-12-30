import { isDevMode } from '@angular/core'
import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import {
    AuthorityState,
    authorityReducer,
} from '@store/entities/auth/authority/authority.reducer'
import { RoleState, roleReducer } from '@store/entities/auth/role/role.reducer'
import { UserState, userReducer } from '@store/entities/auth/user/user.reducer'
import {
    BankDefaultState,
    bankDefaultReducer,
} from '@store/entities/evaluation/bank/bank-default/bank-default.reducer'
import {
    QuizDefaultState,
    quizDefaultReducer,
} from '@store/entities/evaluation/quiz/quiz-default/quiz-default.reducer'
import {
    QuizMcqState,
    quizMcqReducer,
} from '@store/entities/evaluation/quiz/quiz-mcq/quiz-mcq.reducer'
import {
    TagState,
    tagReducer,
} from '@store/entities/evaluation/tag/tag.reducer'
import {
    NotificationState,
    notificationReducer,
} from '@store/notification/notification.reducer'
import {
    RequestQueueState,
    requestQueueReducer,
} from '@store/request-queue/request-queue.reducer'
import { ThemeState, themeReducer } from '@store/theme/theme.reducer'
import { AuthState, authReducer } from '../store/auth/auth.reducer'

export interface AppState {
    theme: ThemeState
    notifications: NotificationState
    auth: AuthState
    users: UserState
    roles: RoleState
    authorities: AuthorityState
    requestQueue: RequestQueueState
    quizDefaults: QuizDefaultState
    quizMcqs: QuizMcqState
    bankDefaults: BankDefaultState
    tags: TagState
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
    quizMcqs: quizMcqReducer,
    bankDefaults: bankDefaultReducer,
    tags: tagReducer,
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : []
