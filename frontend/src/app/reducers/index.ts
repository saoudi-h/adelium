import { isDevMode } from '@angular/core'
import { AppEffects } from '@app.effects'
import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { AuthEffects } from '@store/auth/auth.effects'
import { OauthEffects } from '@store/auth/oauth2/oauth.effects'
import {
    OauthRootState,
    oauthRootReducer,
} from '@store/auth/oauth2/oauth.reducer'
import {
    AuthorityState,
    authorityReducer,
} from '@store/entities/auth/authority/authority.reducer'
import { RoleState, roleReducer } from '@store/entities/auth/role/role.reducer'
import { UserState, userReducer } from '@store/entities/auth/user/user.reducer'
import { UsersEffects } from '@store/entities/auth/users.effects'
import {
    BankDefaultState,
    bankDefaultReducer,
} from '@store/entities/evaluation/bank/bank-default/bank-default.reducer'
import { EvaluationEffects } from '@store/entities/evaluation/evaluation.effects'
import {
    MediaBooleanState,
    mediaBooleanReducer,
} from '@store/entities/evaluation/media/media-boolean/media-boolean.reducer'
import {
    MediaTextState,
    mediaTextReducer,
} from '@store/entities/evaluation/media/media-text/media-text.reducer'
import {
    OptionMcqState,
    optionMcqReducer,
} from '@store/entities/evaluation/option/question-mcq/option-mcq.reducer'
import {
    OptionTrueFalseState,
    optionTrueFalseReducer,
} from '@store/entities/evaluation/option/question-true-false/option-true-false.reducer'
import {
    QuestionMcqState,
    questionMcqReducer,
} from '@store/entities/evaluation/question/question-mcq/question-mcq.reducer'
import {
    QuestionTrueFalseState,
    questionTrueFalseReducer,
} from '@store/entities/evaluation/question/question-true-false/question-true-false.reducer'
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
import { NotificationEffects } from '@store/notification/notification.effects'
import {
    NotificationState,
    notificationReducer,
} from '@store/notification/notification.reducer'
import { RequestQueueEffects } from '@store/request-queue/request-queue.effects'
import {
    RequestQueueState,
    requestQueueReducer,
} from '@store/request-queue/request-queue.reducer'
import { ThemeEffects } from '@store/theme/theme.effects'
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
    questionMcqs: QuestionMcqState
    questionTrueFalses: QuestionTrueFalseState
    optionMcqs: OptionMcqState
    optionTrueFalses: OptionTrueFalseState
    mediaTexts: MediaTextState
    mediaBooleans: MediaBooleanState
    oauth: OauthRootState
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
    questionMcqs: questionMcqReducer,
    questionTrueFalses: questionTrueFalseReducer,
    optionMcqs: optionMcqReducer,
    optionTrueFalses: optionTrueFalseReducer,
    mediaTexts: mediaTextReducer,
    mediaBooleans: mediaBooleanReducer,
    oauth: oauthRootReducer,
}

export const effects = [
    AppEffects,
    ThemeEffects,
    NotificationEffects,
    AuthEffects,
    RequestQueueEffects,
    ...UsersEffects,
    ...EvaluationEffects,
    ...OauthEffects,
]

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : []
